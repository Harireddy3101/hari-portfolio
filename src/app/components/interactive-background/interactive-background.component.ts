import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteractionService } from '../../services/interaction.service';
import { Subscription, fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-interactive-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #canvas class="interactive-canvas"></canvas>
    <div class="windward-overlay" [class.active]="windwardEffect" 
         [style.opacity]="windwardOpacity"
         [style.background]="windwardGradient">
    </div>
  `,
  styles: [`
    .interactive-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .windward-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
      transition: opacity 0.3s ease;
      opacity: 0;
    }

    .windward-overlay.active {
      opacity: 1;
    }
  `]
})
export class InteractiveBackgroundComponent implements OnInit, OnDestroy {
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private motionSubscription?: Subscription;
  private touchSubscription?: Subscription;
  private mouseSubscription?: Subscription;
  windwardEffect = false;
  windwardOpacity = 0;
  windwardGradient = '';
  private motionEffectSubscription?: Subscription;

  constructor(
    private elementRef: ElementRef,
    private interactionService: InteractionService
  ) {}

  ngOnInit() {
    const canvas = this.elementRef.nativeElement.querySelector('canvas');
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();

    // Handle touch events
    this.touchSubscription = fromEvent(window, 'touchmove')
      .pipe(throttleTime(50))
      .subscribe((e: Event) => this.handleTouch(e as TouchEvent));

    // Handle mouse events
    this.mouseSubscription = fromEvent(window, 'mousemove')
      .pipe(throttleTime(50))
      .subscribe((e: Event) => this.handleMouse(e as MouseEvent));

    // Handle device motion
    if (window.DeviceMotionEvent) {
      this.motionSubscription = fromEvent(window, 'devicemotion')
        .pipe(throttleTime(100))
        .subscribe((e: Event) => this.handleMotion(e as DeviceMotionEvent));
    }

    // Subscribe to motion effects
    this.motionEffectSubscription = this.interactionService.motionEffect$
      .subscribe(effect => {
        if (effect) {
          this.windwardEffect = true;
          this.windwardOpacity = effect.intensity * 0.5; // Max 50% dim
          
          switch (effect.direction) {
            case 'left':
              this.windwardGradient = `linear-gradient(to right, rgba(0,0,0,${effect.intensity}), transparent)`;
              break;
            case 'right':
              this.windwardGradient = `linear-gradient(to left, rgba(0,0,0,${effect.intensity}), transparent)`;
              break;
            case 'up':
              this.windwardGradient = `linear-gradient(to bottom, rgba(0,0,0,${effect.intensity}), transparent)`;
              break;
            case 'down':
              this.windwardGradient = `linear-gradient(to top, rgba(0,0,0,${effect.intensity}), transparent)`;
              break;
          }
        } else {
          this.windwardEffect = false;
          this.windwardOpacity = 0;
        }
      });

    this.animate();
  }

  ngOnDestroy() {
    this.motionSubscription?.unsubscribe();
    this.touchSubscription?.unsubscribe();
    this.mouseSubscription?.unsubscribe();
    this.motionEffectSubscription?.unsubscribe();
  }

  private handleTouch(event: TouchEvent) {
    const touch = event.touches[0];
    this.createParticles(touch.clientX, touch.clientY);
  }

  private handleMouse(event: MouseEvent) {
    this.createParticles(event.clientX, event.clientY);
  }

  private handleMotion(event: DeviceMotionEvent) {
    const shakeSpeed = this.interactionService.handleDeviceMotion(event);
    if (shakeSpeed > 0) {
      this.createShakeEffect(shakeSpeed);
    }
  }

  private createParticles(x: number, y: number) {
    for (let i = 0; i < 5; i++) {
      this.particles.push(new Particle(x, y));
    }
  }

  private createShakeEffect(intensity: number) {
    const numParticles = Math.floor(intensity / 2);
    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      this.particles.push(new Particle(x, y));
    }
  }

  private resizeCanvas() {
    const canvas = this.ctx.canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private animate() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    
    this.particles = this.particles.filter(particle => {
      particle.update();
      particle.draw(this.ctx);
      return particle.life > 0;
    });

    requestAnimationFrame(() => this.animate());
  }
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.life = 100;
    this.color = `hsla(${Math.random() * 360}, 70%, 50%, ${this.life / 100})`;
    this.size = Math.random() * 4 + 2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 1;
    this.color = `hsla(${Math.random() * 360}, 70%, 50%, ${this.life / 100})`;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
} 