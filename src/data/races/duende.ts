import Race from '../../interfaces/Race';

const DUENDE: Race = {
  name: 'Duende',
  attributes: {
    attrs: [], // Bônus de atributo são tratados pela habilidade "Dons".
  },
  abilities: [
    {
      name: 'Tipo de Criatura',
      description: 'Você é uma criatura do tipo Espírito.',
    },
    {
      name: 'Natureza',
      description: 'Escolha uma de três naturezas: Animal, Vegetal ou Mineral. Cada uma concede habilidades únicas.',
    },
    {
      name: 'Tamanho',
      description: 'Escolha um de quatro tamanhos: Minúsculo, Pequeno, Médio ou Grande. Cada um afeta seus atributos e deslocamento.',
    },
    {
      name: 'Dons',
      description: 'Você recebe +1 em dois atributos diferentes à sua escolha. Se sua natureza for Animal, pode acumular um bônus para +2 total.',
    },
    {
      name: 'Presentes de Magia e de Caos',
      description: 'Escolha três poderes da lista de presentes. A CD para resistência é baseada em Carisma.',
    },
    // Limitações
    {
      name: 'Aversão a Ferro',
      description: 'Você sofre 1 ponto de dano adicional por dado de dano de armas de ferro/aço e 1d6 de dano por rodada se empunhar ou vestir itens de ferro/aço.',
    },
    {
      name: 'Aversão a Sinos',
      description: 'Ao ouvir um sino, fica alquebrado e esmorecido até o fim da cena.',
    },
    {
      name: 'Tabu',
      description: 'Você possui uma regra de comportamento que não pode quebrar. Escolha uma perícia (Diplomacia, Iniciativa, Luta ou Percepção) para sofrer -5 de penalidade. Quebrar o tabu tem consequências severas.',
    },
  ],
};

export default DUENDE;
