"use server";

const orders = [
  "RANKING",
  "TRACK_ASC",
  "TRACK_DESC",
  "ARTIST_ASC",
  "ARTIST_DESC",
  "ALBUM_ASC",
  "ALBUM_DESC",
  "RATING_ASC",
  "RATING_DESC",
  "DURATION_ASC",
  "DURATION_DESC",
];

export default async function getGame() {
  const indexes: number[] = [];

  function randomOrder() {
    return orders[Math.floor(Math.random() * orders.length)];
  }

  function randomIndex() {
    return Math.floor(Math.random() * 100);
  }

  function randomItem(data: unknown[]) {
    const random = Math.floor(Math.random() * data.length);
    if (indexes.indexOf(random) !== -1) {
      return randomItem(data);
    }
    indexes.push(random);
    return data[random];
  }

  const order = randomOrder();
  const index = randomIndex();
  indexes.push(index);

  const url = `https://api.deezer.com/search?q=artist%3A%22BTS%22&order=${order}&index=${index}`;

  const req = await fetch(url);

  if (!req.ok) {
    return {
      success: false,
    };
  }

  const res = await req.json();

  const data = res.data;

  if (!data) {
    return {
      success: false,
    };
  }

  const item = randomItem(data);
  const itemIndex = data.indexOf(item);
  const options = [
    {
      item,
      right: true,
    },
    {
      item: randomItem(data),
      right: false,
    },
    {
      item: randomItem(data),
      right: false,
    },
    {
      item: randomItem(data),
      right: false,
    },
  ];

  return {
    success: true,
    item,
    options,
  };
}
