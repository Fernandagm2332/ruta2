
//Este componente representa un modal de búsqueda que permite a los usuarios buscar eventos utilizando filtros como ubicación, fecha y detalles del evento 
//El modal consta de varios pasos que guían al usuario a través del proceso de búsqueda 
//El usuario puede seleccionar una ubicación, una fecha y proporcionar detalles adicionales sobre el evento, como el número de participantes, etapas y categorías deseadas

'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from "react";
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';

import useSearchModal from "@/app/hooks/useSearchModal";

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import CountrySelect, { 
  CountrySelectValue
} from "../inputs/CountrySelect";
import Heading from '../Heading';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  // Componente dinámico para cargar el mapa
  const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [location]);

  // Función para retroceder al paso anterior
  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  // Función para avanzar al siguiente paso
  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  // Función para manejar el envío del formulario
  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, 
  [
    step, 
    searchModal, 
    location, 
    router, 
    guestCount, 
    roomCount,
    dateRange,
    onNext,
    bathroomCount,
    params
  ]);

  // Etiqueta del botón de acción principal según el paso actual
  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search'
    }

    return 'Next'
  }, [step]);

  // Etiqueta del botón de acción secundaria según el paso actual
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [step]);

  // Contenido del cuerpo del modal según el paso actual
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="¿Dónde quieres participar?"
        subtitle="¡Encuentra el evento perfecto!"
      />
      <CountrySelect 
        value={location} 
        onChange={(value) => 
          setLocation(value as CountrySelectValue)} 
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="¿Cuándo planeas participar?"
          subtitle="¡Asegúrate que el evento disponibles!"
        />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Mas informacion"
          subtitle="¡Encuentra el evento perfecto!"
        />
        <Counter 
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title="Participantes" 
          subtitle="¿Con cuantos participantes deseas competir?"
        />
        <hr />
        <Counter 
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title="Etapas" 
          subtitle="¿Cuantas etapas deseas?"
        />        
        <hr />
        <Counter 
          onChange={(value) => {
            setBathroomCount(value)
          }}
          value={bathroomCount}
          title="Categorías"
          subtitle="¿Cuántas Categorías necesitas?"
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filtros"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
}

export default SearchModal;
