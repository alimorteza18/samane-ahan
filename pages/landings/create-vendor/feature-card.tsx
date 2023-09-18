const FeatureCard = ({
  title,
  image = "/assets/imgs/theme/icons/icon-1.svg",
  description,
}: FeatureCardProps) => {
  return (
    <div className="featured-card" style={{ height: "400px" }}>
      <img src={image} />
      <h4>{title}</h4>
      <p>{description}</p>
      {/* <a href="#">Read more</a> */}
    </div>
  );
};

export default FeatureCard;

interface FeatureCardProps {
  title: string;
  image?: string;
  description: string;
}
