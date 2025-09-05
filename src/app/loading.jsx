import Image from "next/image";

const Loading = () => {
  return (
    <div>
      {/* Loading... */}
      <Image src="/loader.svg" alt="" style={{maxHeight:'80px'}} fill />
    </div>
  );
};

export default Loading;
