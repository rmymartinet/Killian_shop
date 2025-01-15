import { Data } from "@/types/dataTypes";
import Image from "next/image";

const Grid = ({
  data,
  gridRef,
}: {
  data: Data[];
  gridRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      ref={gridRef}
      className="fixed -top-[10%]  -left-[20%] w-[120%] h-screen md:h-[120%] -z-20 grid grid-cols-8 grid-rows-6 border-dashed border border-gray-200"
    >
      {Array.from({ length: 8 * 6 }).map((_, index) => (
        <div
          key={index}
          className="border border-dashed border-gray-200 "
        ></div>
      ))}
      <div className="col-start-4 p-2 row-start-2 border border-dashed border-gray-200 h-full justify-between flex flex-col col-span-1 row-span-1">
        <p className="font-light text-[0.5rem]">100% unique</p>
        <p className="font-light text-[0.5rem]">100% recyclable</p>
        <p className="font-light text-[0.5rem]">100% unique</p>
        <p className="font-light text-[0.5rem]">100% recyclable</p>
        <p className="font-light text-[0.5rem]">100% unique</p>
        <p className="font-light text-[0.5rem]">100% recyclable</p>
        <p className="font-light text-[0.5rem]">100% unique</p>
        <p className="font-light text-[0.5rem]">100% recyclable</p>
      </div>
      {data[0] && (
        <div className="col-start-1 p-2 row-start-3 border border-dashed border-gray-200 h-full justify-between flex flex-col col-span-1 row-span-1">
          <Image
            alt=""
            src={data[2]?.imageDetails ? data[2].imageDetails[1] : ""}
            width={300}
            height={300}
            className="object-contain w-full h-3/4"
          />
          <div>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[0].title}
            </p>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[0].material}
            </p>
          </div>
        </div>
      )}
      {data[0] && (
        <div className="col-start-2 p-2 row-start-4 border border-dashed border-gray-200 h-full justify-between flex flex-col col-span-1 row-span-1">
          <Image
            alt=""
            src={data[0]?.imageDetails ? data[0].imageDetails[0] : ""}
            width={300}
            height={300}
            className="object-contain w-full h-3/4"
          />
          <div>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[0].title}
            </p>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[0].material}
            </p>
          </div>
        </div>
      )}
      {data[0] && (
        <div className="col-start-3 p-2 row-start-5 border border-dashed border-gray-200 h-full justify-between flex flex-col col-span-1 row-span-1">
          <Image
            alt=""
            src={data[0]?.imageDetails ? data[0].imageDetails[3] : ""}
            width={300}
            height={300}
            className="object-contain w-full h-3/4"
          />
          <div>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[0].title}
            </p>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[0].material}
            </p>
          </div>
        </div>
      )}
      {data[1] && (
        <div className="col-start-6 p-2 row-start-1 border border-dashed border-gray-200 h-full justify-between flex flex-col col-span-1 row-span-1">
          <Image
            alt=""
            src={data[1]?.imageDetails ? data[1].imageDetails[1] : ""}
            width={300}
            height={300}
            className="object-contain w-full h-3/4"
          />
          <div>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[1].title}
            </p>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[1].material}
            </p>
          </div>
        </div>
      )}
      {data[1] && (
        <div className="col-start-2 p-2 row-start-1 border border-dashed border-gray-200 h-full justify-between flex flex-col col-span-1 row-span-1">
          <Image
            alt=""
            src={data[1]?.imageDetails ? data[1].imageDetails[2] : ""}
            width={300}
            height={300}
            className="object-contain w-full h-3/4"
          />
          <div>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[1].title}
            </p>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[1].material}
            </p>
          </div>
        </div>
      )}
      {data[2] && (
        <div className="col-start-8 p-2 row-start-4 border border-dashed border-gray-200 h-full justify-between flex flex-col col-span-1 row-span-1">
          <Image
            alt=""
            src={data[2]?.imageDetails ? data[2].imageDetails[2] : ""}
            width={300}
            height={300}
            className="object-contain w-full h-3/4"
          />
          <div>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[1].title}
            </p>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[1].material}
            </p>
          </div>
        </div>
      )}
      {data[2] && (
        <div className="col-start-6 p-2 row-start-5 border border-dashed border-gray-200 h-full justify-between flex flex-col col-span-1 row-span-1">
          <Image
            alt=""
            src={data[2]?.imageDetails ? data[2].imageDetails[0] : ""}
            width={300}
            height={300}
            className="object-contain w-full h-3/4"
          />
          <div>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[1].title}
            </p>
            <p className="font-light text-[0.375rem] md:text-[0.5rem] lg:text-[0.688rem]">
              {data[1].material}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grid;
