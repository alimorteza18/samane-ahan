const SampleCard = ({
  name = "عنوان",
  modir_name = "نام مدیر",
  vendor_img = "/assets/imgs/page/about-6.png",
  ig_url = "#",
  tg_url = "#",
  website_url = "#",
}: SampleCardProps) => {
  return (
    <div className="team-card">
      <img src={vendor_img} />
      <div className="content text-center">
        <h4 className="mb-5">{name}</h4>
        <span>{modir_name}</span>
        <div className="social-network mt-20">
          {ig_url ? (
            <a href={ig_url}>
              <img src="/assets/imgs/theme/icons/icon-instagram-brand.svg" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SampleCard;

interface SampleCardProps {
  name?: string;
  vendor_img?: string;
  modir_name?: string;
  website_url?: string;
  tg_url?: string;
  ig_url?: string;
}
