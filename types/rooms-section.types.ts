// types/rooms-section.types.ts
export interface RoomCard {
  id: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  link: {
    text: string;
    href: string;
  };
}

export interface RoomsSectionData {
  smallHeading: string;
  mainHeading: string;
  rooms: RoomCard[];
}



