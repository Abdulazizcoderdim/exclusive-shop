import { Link } from 'react-router-dom';

const Featured = () => {
  return (
    <div className="space-y-10 mt-20">
      <div className="flex items-center gap-3">
        <div className="w-[20px] h-[40px] rounded-md bg-red" />
        <p className="text-red font-semibold text-base">Featured</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-28">
          <p className="text-black font-semibold sm:text-4xl text-2xl">
            New Arrival
          </p>
        </div>
      </div>
      <div className="mt-10 flex flex-col lg:flex-row gap-5 text-white">
        <div className="relative min-h-[300px] lg:min-h-[600px] w-full lg:w-1/2 bg-black rounded-md overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/grid1.png"
              width={400}
              height={400}
              alt="PlayStation 5"
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-5 left-5 space-y-2 z-10">
            <h3 className="font-semibold text-xl lg:text-2xl">PlayStation 5</h3>
            <p className="font-normal text-xs lg:text-sm pb-2">
              Black and White version of the PS5{' '}
              <br className="hidden sm:inline" /> coming out on sale.
            </p>
            <Link to="#" className="underline font-medium text-sm lg:text-base">
              Shop Now
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-1/2 min-h-[600px] gap-y-5">
          <div className="h-[300px] lg:h-1/2 bg-black relative rounded-md overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/grid2.png"
                width={400}
                height={300}
                alt="Women's Collections"
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-5 left-5 space-y-2 z-10">
              <h3 className="font-semibold text-xl lg:text-2xl">
                Women's Collections
              </h3>
              <p className="font-normal text-xs lg:text-sm pb-2">
                Featured woman collections that{' '}
                <br className="hidden sm:inline" /> give you another vibe.
              </p>
              <Link
                to="#"
                className="underline font-medium text-sm lg:text-base"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row h-[600px] sm:h-[300px] lg:h-1/2 items-center gap-5">
            <div className="h-[300px] w-full sm:w-1/2 bg-black rounded-md relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/grid3.png"
                  width={200}
                  height={200}
                  alt="Speakers"
                  className="object-contain"
                />
              </div>
              <div className="absolute bottom-5 left-5 space-y-2 z-10">
                <h3 className="font-semibold text-xl lg:text-2xl">Speakers</h3>
                <p className="font-normal text-xs lg:text-sm pb-2">
                  Amazon wireless speakers
                </p>
                <Link
                  to="#"
                  className="underline font-medium text-sm lg:text-base"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="h-[300px] w-full sm:w-1/2 bg-black rounded-md relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/grid4.png"
                  width={200}
                  height={200}
                  alt="Perfume"
                  className="object-contain"
                />
              </div>
              <div className="absolute bottom-5 left-5 space-y-2 z-10">
                <h3 className="font-semibold text-xl lg:text-2xl">Perfume</h3>
                <p className="font-normal text-xs lg:text-sm pb-2">
                  GUCCI INTENSE OUD EDP
                </p>
                <Link
                  to="#"
                  className="underline font-medium text-sm lg:text-base"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
