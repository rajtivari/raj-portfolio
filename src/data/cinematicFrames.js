// Auto-generates the frame path list for the cinematic sequence.
// Frames live in /public/frames/frame_001.webp ... frame_119.webp
export const FRAME_COUNT = 119;
 
 export const getFramePath = (index) => {
   const n = String(index + 1).padStart(3, "0");
    return `${import.meta.env.BASE_URL}frames/frame_${n}.webp`;
    };
      
      export const CINEMATIC_FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) =>
        getFramePath(i)
    );
         o-generates