import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface MotionEffect {
  direction: 'left' | 'right' | 'up' | 'down';
  intensity: number;
}

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private readonly SHAKE_THRESHOLD = 15;
  private lastX = 0;
  private lastY = 0;
  private lastZ = 0;
  private lastUpdate = 0;
  private readonly MOTION_THRESHOLD = 2;

  private motionEnabled = new BehaviorSubject<boolean>(false);
  motionEnabled$ = this.motionEnabled.asObservable();
  private motionEffect = new BehaviorSubject<MotionEffect | null>(null);
  motionEffect$ = this.motionEffect.asObservable();

  constructor() {
    this.requestDeviceMotionPermission();
  }

  async requestDeviceMotionPermission() {
    if (typeof DeviceMotionEvent !== 'undefined' && 
        typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceMotionEvent as any).requestPermission();
        this.motionEnabled.next(permission === 'granted');
      } catch (error) {
        console.error('Error requesting device motion permission:', error);
      }
    } else {
      // Device motion API not available or permission not required
      this.motionEnabled.next(true);
    }
  }

  handleDeviceMotion(event: DeviceMotionEvent): number {
    const current = event.accelerationIncludingGravity;
    if (!current) return 0;

    const currentTime = new Date().getTime();
    const diffTime = currentTime - this.lastUpdate;

    if (diffTime > 100) {
      this.lastUpdate = currentTime;
      
      // Handle windward effect
      if (current.x && Math.abs(current.x) > this.MOTION_THRESHOLD) {
        this.motionEffect.next({
          direction: current.x > 0 ? 'right' : 'left',
          intensity: Math.min(Math.abs(current.x) / 10, 1)
        });
      } else if (current.y && Math.abs(current.y) > this.MOTION_THRESHOLD) {
        this.motionEffect.next({
          direction: current.y > 0 ? 'down' : 'up',
          intensity: Math.min(Math.abs(current.y) / 10, 1)
        });
      } else {
        this.motionEffect.next(null);
      }

      const deltaX = Math.abs(this.lastX - (current.x || 0));
      const deltaY = Math.abs(this.lastY - (current.y || 0));
      const deltaZ = Math.abs(this.lastZ - (current.z || 0));

      const speed = Math.max(deltaX, deltaY, deltaZ) / diffTime * 10000;
      
      this.lastX = current.x || 0;
      this.lastY = current.y || 0;
      this.lastZ = current.z || 0;

      return speed > this.SHAKE_THRESHOLD ? speed : 0;
    }
    return 0;
  }
} 