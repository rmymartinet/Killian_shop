import { FaUser, FaEnvelope, FaCalendar, FaShoppingCart } from "react-icons/fa";

const ProfileSkeleton = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center gap-10 p-8 mt-[20vh]">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        {/* Header du profil Skeleton */}
        <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-200">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <FaUser size={32} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="w-64 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="flex items-center gap-2 mt-2">
              <FaEnvelope size={16} className="text-gray-400" />
              <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <FaCalendar size={16} className="text-gray-400" />
              <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        {/* Section des commandes Skeleton */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <FaShoppingCart className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">
              Mes commandes
            </h2>
          </div>

          {/* Container des commandes avec scroll */}
          <div 
            className="border border-gray-200 rounded-lg p-4"
            style={{
              height: '400px',
              overflowY: 'auto',
              overflowX: 'hidden'
            }}
          >
            <div className="space-y-6 pr-4">
              {/* Skeleton pour 3 commandes */}
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-6 bg-white"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Informations de la commande Skeleton */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FaShoppingCart className="text-blue-600" size={16} />
                          <div className="w-40 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    {/* Adresse de livraison Skeleton */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-600 rounded"></div>
                        <div className="w-32 h-5 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-40 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-36 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileSkeleton; 