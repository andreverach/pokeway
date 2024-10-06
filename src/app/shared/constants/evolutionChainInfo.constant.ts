import { EvolutionChainInfo } from '../../core/interfaces/evolutionChainInfo';

export const EVOLUTION_CHAIN_INFO_EMPTY: EvolutionChainInfo = {
  chain: {
    evolution_details: [
      {
        item: {
          name: '',
          url: '',
        },
        trigger: {
          name: '',
          url: '',
        },
      },
    ],
    evolves_to: [
      {
        evolution_details: [
          {
            item: {
              name: '',
              url: '',
            },
            trigger: {
              name: '',
              url: '',
            },
          },
        ],
        evolves_to: [],
        species: {
          name: '',
          url: '',
        },
      },
    ],
    species: {
      name: '',
      url: '',
    },
  },
  id: 0,
  chainGallery: [
    {
      name: '',
      image: '',
      trigger: '',
    },
  ],
};
