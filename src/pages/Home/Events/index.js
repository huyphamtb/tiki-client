import { Event } from "../../../components";
import "./style.scss";

const eventsList = [
  {
    id: 1,
    thumbnail:
      "https://salt.tikicdn.com/cache/w100/ts/upload/8e/da/23/b48fcdccbdfda229af56c223eb0810d1.png.webp",
    title: "Săn thưởng mỗi ngày",
  },
  {
    id: 2,
    thumbnail:
      "https://salt.tikicdn.com/cache/w100/ts/upload/c6/51/d4/ea40d059ba89812ac1cf2d9e66415286.png.webp",
    title: "Siêu sale Sinh Nhật",
  },
  {
    id: 3,
    thumbnail:
      "https://salt.tikicdn.com/cache/w100/ts/upload/a0/0d/90/bab67b6da67117f40538fc54fb2dcb5e.png.webp",
    title: "Đi chợ online",
  },
  {
    id: 4,
    thumbnail:
      "https://salt.tikicdn.com/cache/w100/ts/upload/73/50/e1/83afc85db37c472de60ebef6eceb41a7.png.webp",
    title: "Mã giảm giá",
  },
  {
    id: 5,
    thumbnail:
      "https://salt.tikicdn.com/cache/w100/ts/upload/ef/ae/82/f40611ad6dfc68a0d26451582a65102f.png.webp",
    title: "Bảo hiểm Tiki360",
  },
  {
    id: 6,
    thumbnail:
      "https://salt.tikicdn.com/cache/w100/ts/upload/73/e0/7d/af993bdbf150763f3352ffa79e6a7117.png.webp",
    title: "Dịch vụ & Tiện ích",
  },
  {
    id: 7,
    thumbnail:
      "https://salt.tikicdn.com/cache/w100/ts/upload/ce/ee/fe/a8a350727b38a1e20ce1610c5162fcb7.png.webp",
    title: "Gói hội viên",
  },
  {
    id: 8,
    thumbnail:
      "https://salt.tikicdn.com/cache/w100/ts/upload/99/29/ff/cea178635fd5a24ad01617cae66c065c.png.webp",
    title: "Giảm đến 50%",
  },
  {
    id: 9,
    thumbnail:
      "https://salt.tikicdn.com/cache/w100/ts/upload/52/50/73/0788d5207ec8b82e05859dfe953a4327.png.webp",
    title: "Hoàn tiền 15%",
  },
  {
    id: 10,
    thumbnail:
      "https://salt.tikicdn.com/cache/w100/ts/upload/4a/b2/c5/b388ee0e511889c83fab1217608fe82f.png.webp",
    title: "Ưu đãi thanh toán",
  },
];

const Events = () => {
  return (
    <div id="events_home">
      <div className="events_home__wrap">
        <div className="events_list">
          {eventsList?.map((eventItem) => {
            return (
              <div className="event_item" key={eventItem.id}>
                <Event event={eventItem} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Events;
