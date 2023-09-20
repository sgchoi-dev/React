import Image from "next/image";
import imgSrc from "/public/food0.png";

export default function List() {
  let 상품 = ["Tomatoes", "Pasta", "Coconut"];

  return (
    <div>
      <h4 className="title">상품목록</h4>
      {상품.map((item, index) => {
        return (
          <div className="food" key={index}>
            <img className="food-img" src={`/food${index}.png`} alt="" />
            {/* <Image src={imgSrc} alt="" className="food-img" /> */}
            {/* <Image
              src="https://developers.kakao.com/static/images/pc/news/if_kakao.webp"
              alt=""
              className="food-img"
              width={500}
              height={400}
            /> */}
            <h4>{item} $40</h4>
          </div>
        );
      })}
    </div>
  );
}
