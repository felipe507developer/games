export interface ColeccionLoterias {
    loterias: Loteria[];
}

export interface Loteria {
    id: string;
    date: string;
    numbers: Numbers[];
}

export interface Numbers {
    id: number;
    number: string;
    available: number;
    bussy: number;
    personas: Personas[];
}

export interface Personas{
    id: string;
    name: string;
    phone: string;
    quantity: number;
}

export interface ColeccionWinners {
    winners: Winners[];
}

export interface Winners{
    id: string;
    numbers: number[];
    info: Info[]; 
}

export interface Info{
    id: string;
    number: string;
    persona: Personas[];
}
