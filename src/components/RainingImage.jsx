import React, { useRef, useEffect, useState } from 'react';
import { styled } from 'styletron-react';
import colors from '../constants/colors';

const numberOfParticles = 2500;
const particles = [];
const sizeModifier = 1;

const calculateRelativeBrightness = (red, green, blue) =>
  Math.sqrt(red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114) /
  100;

const Container = styled('div', {
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

const Canvas = styled('canvas', {
  width: '600px',
  height: '600px',
});

const ButtonContainer = styled('div', {
  position: 'absolute',
  bottom: '0',
  left: '0',
  width: '100%',
  display: 'flex',
  gap: '1em',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1em',
  boxSizing: 'border-box',
});

const Button = styled('button', {
  display: 'inline-block',
  color: colors.etherealMistWhite,
  boxShadow: 'rgba(255,255,255,0.3) 0px 0px 80px',
  transition: 'all 0.5s ease-in-out 0.1s',
  textTransform: 'Capitalize',

  fontFamily: '"Open Sans", sans-serif',
  padding: '1em',
  opacity: 0.8,

  ':hover': {
    backdropFilter: 'hue-rotate(270deg) blur(10px)',
    backgroundColor: colors.ceruleanBlue,
    cursor: 'pointer',
    transform: 'scale(1.1)',
    transition: 'all 0.2s ease-in-out',
  },
});

export default () => {
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const onImageLoad = (image) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const mappedImage = [];

    for (let y = 0; y < canvas.height; y++) {
      let row = [];
      for (let x = 0; x < canvas.width; x++) {
        const red = pixels.data[y * 4 * pixels.width + x * 4];
        const green = pixels.data[y * 4 * pixels.width + (x * 4 + 1)];
        const blue = pixels.data[y * 4 * pixels.width + (x * 4 + 2)];
        const alpha = pixels.data[y * 4 * pixels.width + (x * 4 + 3)];
        const brightness = calculateRelativeBrightness(red, green, blue);
        const cell = [
          brightness,
          'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')',
        ];

        row.push(cell);
      }
      mappedImage.push(row);
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.speed = 0;
        this.velocity = Math.random() * 0.5;
        this.size = Math.random() * sizeModifier;
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
      }

      update() {
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        this.speed = mappedImage[this.position1][this.position2][0];

        let movement = this.speed + this.velocity;
        this.y += movement;

        if (this.y >= canvas.height) {
          this.y = 0;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = mappedImage[this.position1][this.position2][1];
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    init();

    const animate = () => {
      ctx.globalAlpha = 0.01; // This value determines the rate of fading. Smaller values will fade slower.
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over'; // Default value

      ctx.globalAlpha = 1;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        ctx.globalAlpha = particles[i].speed * 0.5;
        particles[i].draw();
      }

      requestAnimationFrame(animate);
    };

    animate();
  };

  useEffect(() => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => onImageLoad(image);

    return () => {
      image.onload = null;
    };
  }, [imageSrc]);

  return (
    <Container>
      <Canvas width="600" height="600" ref={canvasRef} />
      <ButtonContainer>
        <Button onClick={() => setImageSrc('dist/assets/lumina.png')}>
          Lumina
        </Button>
        <Button onClick={() => setImageSrc('dist/assets/elara.png')}>
          Elara
        </Button>
      </ButtonContainer>
    </Container>
  );
};
