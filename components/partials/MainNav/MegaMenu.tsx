export default function MegaMenu() {
  return (
    <ul className="mega-menu">
      <li className="sub-mega-menu sub-mega-menu-width-22">
        <a className="menu-title" href="#">
          Fruit & Vegetables
        </a>
        <ul>
          <li>
            <a href="#">Meat & Poultry</a>
          </li>
          <li>
            <a href="#">Fresh Vegetables</a>
          </li>
          <li>
            <a href="#">Herbs & Seasonings</a>
          </li>
          <li>
            <a href="#">Cuts & Sprouts</a>
          </li>
          <li>
            <a href="#">Exotic Fruits & Veggies</a>
          </li>
          <li>
            <a href="#">Packaged Produce</a>
          </li>
        </ul>
      </li>
      <li className="sub-mega-menu sub-mega-menu-width-22">
        <a className="menu-title" href="#">
          Breakfast & Dairy
        </a>
        <ul>
          <li>
            <a href="#">Milk & Flavoured Milk</a>
          </li>
          <li>
            <a href="#">Butter and Margarine</a>
          </li>
          <li>
            <a href="#">Eggs Substitutes</a>
          </li>
          <li>
            <a href="#">Marmalades</a>
          </li>
          <li>
            <a href="#">Sour Cream</a>
          </li>
          <li>
            <a href="#">Cheese</a>
          </li>
        </ul>
      </li>
      <li className="sub-mega-menu sub-mega-menu-width-22">
        <a className="menu-title" href="#">
          Meat & Seafood
        </a>
        <ul>
          <li>
            <a href="#">Breakfast Sausage</a>
          </li>
          <li>
            <a href="#">Dinner Sausage</a>
          </li>
          <li>
            <a href="#">Chicken</a>
          </li>
          <li>
            <a href="#">Sliced Deli Meat</a>
          </li>
          <li>
            <a href="#">Wild Caught Fillets</a>
          </li>
          <li>
            <a href="#">Crab and Shellfish</a>
          </li>
        </ul>
      </li>
      <li className="sub-mega-menu sub-mega-menu-width-34">
        <div className="menu-banner-wrap">
          <a href="#">
            <img src="/assets/imgs/banner/banner-menu.png" alt="Nest" />
          </a>
          <div className="menu-banner-content">
            <h4>Hot deals</h4>
            <h3>
              Don't miss
              <br />
              Trending
            </h3>
            <div className="menu-banner-price">
              <span className="new-price text-success">Save to 50%</span>
            </div>
            <div className="menu-banner-btn">
              <a href="#">Shop now</a>
            </div>
          </div>
          <div className="menu-banner-discount">
            <h3>
              <span>25%</span>
              off
            </h3>
          </div>
        </div>
      </li>
    </ul>
  );
}
