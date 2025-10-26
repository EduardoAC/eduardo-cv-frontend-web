'use client'

export const initializeAboutMe = () => {
  const universityExpedient = document.getElementById("university-expedient");
  if (!universityExpedient) return;
  
  const childrenPages = universityExpedient.children;
  const childrenCount = childrenPages.length;

  const openFullSizePicture = function(this: HTMLElement) {
    const container = document.createElement("DIV");
    container.className = "modal";
    container.style.display = 'block';
    container.style.overflow = 'scroll';
    container.style.backgroundColor = '#666';

    const currentImg = this.querySelector("IMG") as HTMLImageElement;
    if (!currentImg) return;
    
    const img = document.createElement("IMG") as HTMLImageElement;
    img.src = currentImg.src;
    
    const containerInner = document.createElement("DIV");
    containerInner.style.margin = "0 auto";
    containerInner.style.width = currentImg.naturalWidth + "px";
    containerInner.style.height = currentImg.naturalHeight + "px";
    
    containerInner.appendChild(img);
    container.appendChild(containerInner);
    
    container.addEventListener('click', function() {
      const parent = container.parentNode;
      if (parent) {
        parent.removeChild(container);
      }
    });
    document.body.appendChild(container);
  };
  
  for (let i = 0; i < childrenCount; i++) {
    const currChild = childrenPages[i] as HTMLElement;
    currChild.addEventListener('click', openFullSizePicture, false);
  }
}; 
