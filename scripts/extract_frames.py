import cv2
import os
import sys

def extract_frames(video_path="public/assets/video.mp4", output_dir="public/assets/hero-frames", num_frames=120, quality=78):
    if not os.path.exists(video_path):
        print(f"Error: Video file not found at {video_path}")
        sys.exit(1)
        
    os.makedirs(output_dir, exist_ok=True)
    cap = cv2.VideoCapture(video_path)
    
    if not cap.isOpened():
        print(f"Error: Could not open {video_path}")
        sys.exit(1)
        
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    print(f"Video info: {w}x{h}, {fps} FPS, {total_frames} total frames")
    print(f"Extracting {num_frames} frames to {output_dir}...")
    
    # We want num_frames sampled evenly from frame 0 to total_frames - 1
    indices = [int(round(i * (total_frames - 1) / (num_frames - 1))) for i in range(num_frames)]
    
    saved_count = 0
    current_target_idx = 0
    
    for frame_idx in range(total_frames):
        ret, frame = cap.read()
        if not ret:
            break
            
        while current_target_idx < len(indices) and indices[current_target_idx] == frame_idx:
            saved_count += 1
            filename = f"frame-{saved_count:04d}.webp"
            filepath = os.path.join(output_dir, filename)
            cv2.imwrite(filepath, frame, [cv2.IMWRITE_WEBP_QUALITY, quality])
            current_target_idx += 1
            
    cap.release()
    print(f"Successfully extracted {saved_count} frames to {output_dir}.")

if __name__ == "__main__":
    extract_frames()
