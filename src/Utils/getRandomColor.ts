export default function getRandomColor(): string {
  const colors = ["#F6DEC2", "#D2D1FF", "#C5F8C4"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
