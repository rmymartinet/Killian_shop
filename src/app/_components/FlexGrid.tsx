import { Data } from "@/types/dataTypes";
import Image from "next/image";

const FlexGrid = ({
  data,
  gridRef,
}: {
  data: Data[];
  gridRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div ref={gridRef} className="absolute -left-[20%] flex inset-0 -z-10">
      <div className="flex shrink-0 flex-col h-[150px] w-[150px]">
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200"></div>
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200">
          {data[0] && (
            <div className="p-2 h-full justify-between flex flex-col">
              <Image
                alt=""
                src={data[0]?.imageDetails ? data[0].imageDetails[3] : ""}
                width={300}
                height={300}
                className="object-cover w-full h-3/4"
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
        </div>
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200"></div>
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200">
          {data[0] && (
            <div className="p-2 h-full justify-between flex flex-col">
              <Image
                alt=""
                src={
                  data[2] && data[2].imageDetails ? data[2].imageDetails[1] : ""
                }
                width={300}
                height={300}
                className="object-cover w-full h-3/4"
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
        </div>
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200"></div>
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200"></div>
      </div>
      <div className="flex shrink-0 flex-col h-[150px] w-[150px]">
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200"></div>
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200"></div>
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200"></div>
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200"></div>
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200">
          {data[0] && (
            <div className="p-2 h-full justify-between flex flex-col">
              <Image
                alt=""
                src={
                  data[0] && data[0].imageDetails ? data[0].imageDetails[0] : ""
                }
                width={300}
                height={300}
                className="object-cover w-full h-3/4"
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
        </div>
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200"></div>
      </div>
      <div className="flex shrink-0 flex-col h-[150px] w-[150px]">
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200">
          {data[2] && (
            <div className="p-2 h-full justify-between flex flex-col">
              <Image
                alt=""
                src={
                  data[2] && data[2].imageDetails ? data[2].imageDetails[2] : ""
                }
                width={300}
                height={300}
                className="object-cover w-full h-3/4"
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
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200">
          {data[0] && (
            <div className="p-2 h-full justify-between flex flex-col">
              <Image
                alt=""
                src={
                  data[0] && data[0].imageDetails ? data[0].imageDetails[1] : ""
                }
                width={300}
                height={300}
                className="object-contain w-full h-full"
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
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200"></div>
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200"></div>
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center  px-2 py-1 border-dashed border border-gray-200">
          <div>
            <p className="font-light text-[0.5rem]">100% unique</p>
            <p className="font-light text-[0.5rem]">100% recyclable</p>
            <p className="font-light text-[0.5rem]">100% unique</p>
            <p className="font-light text-[0.5rem]">100% recyclable</p>
            <p className="font-light text-[0.5rem]">100% unique</p>
            <p className="font-light text-[0.5rem]">100% recyclable</p>
            <p className="font-light text-[0.5rem]">100% unique</p>
            <p className="font-light text-[0.5rem]">100% recyclable</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200"></div>
      </div>
      <div className="flex shrink-0 flex-col h-[150px] w-[150px]">
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200"></div>
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200"></div>
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200"></div>
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200">
          {data[1] && (
            <div className="p-2 h-full justify-between flex flex-col">
              <Image
                alt=""
                src={
                  data[1] && data[1].imageDetails ? data[1].imageDetails[2] : ""
                }
                width={300}
                height={300}
                className="object-cover w-full h-3/4"
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
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200"></div>
        <div className="flex shrink-0 flex-col w-full h-full items-center justify-center px-2 py-1 border-dashed border border-gray-200">
          {data[2] && (
            <div className="p-2 h-full justify-between flex flex-col">
              <Image
                alt=""
                src={
                  data[2] && data[2].imageDetails ? data[2].imageDetails[0] : ""
                }
                width={300}
                height={300}
                className="object-cover w-full h-3/4"
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
      </div>
    </div>
  );
};

export default FlexGrid;
