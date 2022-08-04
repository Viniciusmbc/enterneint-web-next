export default function Title({ title, bookmarkedtvSeries }) {
  return (
    <h1
      className={`pb-6 pl-4 text-xl md:pt-16  ${
        bookmarkedtvSeries && "pt-9"
      }  text-xl text-white`}
    >
      {title}
    </h1>
  );
}
