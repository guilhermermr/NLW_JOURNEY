import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus, User } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateTripPage() {

  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setConfirmTripModalOpen] = useState(false)

  const [emailToInvite, setemailToInvite] = useState([
    'guilhermermribeiro@gmail.com'
  ])

  function openGestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGestsInput() {
    setIsGuestsInputOpen(false)
  }

  function openGestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGestsModal() {
    setIsGuestsModalOpen(false)
  }

  function openConfirmTripModalOpen() {
    setConfirmTripModalOpen(true)
  }

  function closeConfirmTripModalOpen() {
    setConfirmTripModalOpen(false)
  }

  function createTrip(){
    navigate('/trips/123')
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    setemailToInvite([
      ...emailToInvite,
      email
    ])
  }

  function removeEmailFromInvires(emailToRemove: string) {
    const newEmailList = emailToInvite.filter(email => email !== emailToRemove)

    setemailToInvite(newEmailList)
  }



  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="Plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input disabled={isGuestsInputOpen} className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" type="text" placeholder="Para onde você vai?" />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input disabled={isGuestsInputOpen} className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none" type="text" placeholder="Quando?" />
            </div>

            <div className="w-px h-6 bg-zinc-800"></div>

            {
              isGuestsInputOpen ? (
                <button onClick={closeGestsInput} className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
                  Alterar local/data
                  <Settings2 className="size-5" />
                </button>
              ) : (
                <button onClick={openGestsInput} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                  Continuar
                  <ArrowRight className="size-5" />
                </button>
              )}
          </div>

          {
            isGuestsInputOpen && (

              <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
                <button type="button" onClick={openGestsModal} className="flex items-center gap-2 flex-1">
                  <UserRoundPlus className="size-5 text-zinc-400" />
                  {
                  emailToInvite.length > 0 ?  
                    (
                      <span className="text-zinc-100 text-lg text-left">{emailToInvite.length} pessoa(s) convidada(s)</span>
                    ) :
                    (
                      <span className="text-zinc-400 text-lg text-left">Quem estará na viagem?</span>
                    )
                  }
                </button>

                <div className="w-px h-6 bg-zinc-800"></div>

                <button onClick={openConfirmTripModalOpen} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                  Confirmar viagem
                  <ArrowRight className="size-5" />
                </button>
              </div>

            )
          }
        </div>

        <p className="text-zinc-500 text-sm">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.</p>
      </div>


      {
        isGuestsModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Selecionar convidados</h2>
                  <button onClick={closeGestsModal}>
                    <X className="size-5 text-zinc-400" />
                  </button>
                </div>
                <p className="text-sm text-zinc-400">Os convidados irão receber e-mails para confirmar a participação na viagem.</p>

              </div>
              <div className="flex flex-wrap gap-2">
                {
                  emailToInvite.map(email => {
                    return (
                      <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2 w-fit">
                        <span className="text-zinc-300">{email}</span>
                        <button type="button">
                          <X onClick={() => removeEmailFromInvires(email)} className="size-4 text-zinc-400" />
                        </button>
                      </div>
                    )
                  })
                }
              </div>
              <div className="w-full h-px bg-zinc-800" />

              <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-s-indigo-900 rounded-lg flex items-center gap-2">
                <div className="px-2 flex items-center flex-1 gap-2">
                  <AtSign className="text-zinc-400 size-5" />
                  <input
                    type="email"
                    name="email"
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                    placeholder="Digite o e-mail do convidado"
                  />
                </div>
                <button type="submit" className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                  Convidar
                  <Plus className="size-5" />
                </button>
              </form>
            </div>
          </div>
        )
      }

      {isConfirmTripModalOpen &&
        (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Confirmar criação de viagem</h2>
                  <button onClick={closeConfirmTripModalOpen}>
                    <X className="size-5 text-zinc-400" />
                  </button>
                </div>
                <p className="text-sm text-zinc-400">Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">Florianópolis, Brasil</span> nas datas de <span className="font-semibold text-zinc-100">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:</p>

              </div>  
              <form onSubmit={addNewEmailToInvite} className="space-y-3">
                <div className="h-14 px-4 bg-zinc-950 border border-s-indigo-900 rounded-lg flex items-center gap-2">
                  <User className="text-zinc-400 size-5" />
                  <input
                    type="text"
                    name="name"
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                    placeholder="Seu nome completo"
                  />
                </div>  
                <div className="h-14 px-4 bg-zinc-950 border border-s-indigo-900 rounded-lg flex items-center gap-2">
                  <User className="text-zinc-400 size-5" />
                  <input
                    type="email"
                    name="email"
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                    placeholder="Seu e-mail pessoal"
                  />
                </div>
                <button onClick={createTrip} type="submit" className="bg-lime-300 text-lime-950 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-lime-400 w-full justify-center">
                  Confirmar criação da viagem
                </button>
              </form>
            </div>
          </div>
        )        
      }

    </div>
  )
}