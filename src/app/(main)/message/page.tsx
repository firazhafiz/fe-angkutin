import Image from "next/image";
import backIcon from "../../../../public/icons/back.png";
import profile from "../../../../public/images/gallery4.jpg";

export default function MessagePage() {
  return (
    <main className="w-full h-full relative min-h-screen bg-gray-100 overflow-hidden ">
      <div className="flex gap-2.5 w-full mt-40 px-40 h-4/5">
        <div className="w-1/4 min-h-[720px] bg-white rounded-2xl  p-5">
          <div className="flex gap-4 items-center">
            <div className="bg-[#F0F0F0] rounded-full w-fit p-2 cursor-pointer">
              <Image src={backIcon} alt="back-icon" className="h-6 w-6" />
            </div>
            <h2 className="text-[#016A70] font-semibold text-xl">Messages</h2>
          </div>
          <div className="mt-8">
            <div className="flex gap-2">
              <Image
                src={profile}
                alt="profile"
                className="rounded-full h-[50px] w-[50px]"
              />

              <div>
                <h2 className="text-lg font-semibold text-[#016A70]">
                  Victoria
                </h2>
                <p className="text-slate-500 text-sm">Hi! Great question...</p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Image
                src={profile}
                alt="profile"
                className="rounded-full h-[50px] w-[50px]"
              />

              <div>
                <h2 className="text-lg font-semibold text-[#016A70]">
                  Alexander
                </h2>
                <p className="text-slate-500 text-sm">Hi! Great question...</p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Image
                src={profile}
                alt="profile"
                className="rounded-full h-[50px] w-[50px]"
              />

              <div>
                <h2 className="text-lg font-semibold text-[#016A70]">Thomas</h2>
                <p className="text-slate-500 text-sm">Hi! Great question...</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full min-h-[720px] bg-white rounded-2xl p-5 flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="flex gap-3 pb-2 border-b border-slate-300">
              <Image
                src={profile}
                alt="profile"
                className="rounded-full h-[50px] w-[50px]"
              />
              <div>
                <h2 className="text-lg font-semibold text-[#016A70]">
                  Victoria
                </h2>
                <p className="text-slate-500 text-sm">Professor</p>
              </div>
            </div>

            {/* Chat bubble */}
            <div className="mt-4 flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2">
              {/* Incoming message */}
              <div className="flex items-start gap-2">
                <Image
                  src={profile}
                  alt="profile"
                  className="rounded-full h-[40px] w-[40px]"
                />
                <div>
                  <div className="bg-[#F0F0F0] p-3 rounded-2xl max-w-xs">
                    <p className="text-sm text-slate-700">
                      Hi! I saw your submission, it&apos;s very interesting.
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Friday at 1.24 PM
                  </p>
                </div>
              </div>

              {/* Outgoing message */}
              <div className="flex justify-end">
                <div>
                  <div className="bg-[#016A70] text-white p-3 rounded-2xl max-w-xs">
                    <p className="text-sm">
                      Thank you! I&apos;m happy to hear that. Do you have any
                      feedback?
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 text-right">
                    Friday at 1.29 PM
                  </p>
                </div>
              </div>

              {/* Incoming message */}
              <div className="flex items-start gap-2">
                <Image
                  src={profile}
                  alt="profile"
                  className="rounded-full h-[40px] w-[40px]"
                />
                <div>
                  <div className="bg-[#F0F0F0] p-3 rounded-2xl max-w-xs">
                    <p className="text-sm text-slate-700">
                      Yes, I would suggest improving your conclusion section.
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Friday at 1.29 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat input */}
          <div className="mt-4 pt-3 border-t border-slate-300">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full border text-slate-500 border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-0"
              />
              <button className="bg-[#016A70] text-white px-4 py-2 rounded-xl cursor-pointer">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
