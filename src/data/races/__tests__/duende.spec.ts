import { Atributo } from '../../atributos';
import DUENDE from '../duende';

describe('Testa as definições da raça Duende', () => {
  test('Deve ter o nome "Duende"', () => {
    expect(DUENDE.name).toBe('Duende');
  });

  test('Deve ser do tipo Espírito', () => {
    const tipoHabilidade = DUENDE.abilities.find(
      (ability) => ability.name === 'Tipo de Criatura'
    );
    expect(tipoHabilidade).toBeDefined();
    expect(tipoHabilidade?.description).toContain('Espírito');
  });

  test('Não deve ter bônus de atributo base', () => {
    expect(DUENDE.attributes.attrs).toHaveLength(0);
  });

  test('Deve ter as habilidades de escolha descritas', () => {
    const nomesHabilidades = DUENDE.abilities.map((a) => a.name);
    expect(nomesHabilidades).toContain('Natureza');
    expect(nomesHabilidades).toContain('Tamanho');
    expect(nomesHabilidades).toContain('Dons');
    expect(nomesHabilidades).toContain('Presentes de Magia e de Caos');
  });

  test('Deve incluir as três limitações obrigatórias', () => {
    const nomesHabilidades = DUENDE.abilities.map((a) => a.name);
    expect(nomesHabilidades).toContain('Aversão a Ferro');
    expect(nomesHabilidades).toContain('Aversão a Sinos');
    expect(nomesHabilidades).toContain('Tabu');
  });
});

describe('Testa o setup da raça Duende', () => {
  test('Deve aplicar o Tabu corretamente', () => {
    expect(DUENDE.setup).toBeDefined();
    if (!DUENDE.setup) return;

    const choices = { tabu: 'Luta' };
    const received = DUENDE.setup(DUENDE, [], choices);
    const tabu = received.abilities.find((ability) => ability.name === 'Tabu');

    expect(tabu).toBeDefined();
    expect(tabu?.description).toContain('-5 de penalidade em Luta');
    expect(tabu?.sheetBonuses).toBeDefined();
    expect(tabu?.sheetBonuses?.[0].target).toEqual({
      type: 'Skill',
      name: 'Luta',
    });
    expect(tabu?.sheetBonuses?.[0].modifier).toEqual({
      type: 'Fixed',
      value: -5,
    });
  });

  test('Deve aplicar o tamanho Minúsculo', () => {
    expect(DUENDE.setup).toBeDefined();
    if (!DUENDE.setup) return;

    const choices = {
      tamanho: 'Minúsculo',
      donsAttrs: [Atributo.INTELIGENCIA, Atributo.SABEDORIA],
    };
    const received = DUENDE.setup(DUENDE, [], choices);

    expect(received.attributes.attrs).toHaveLength(3);
    expect(received.attributes.attrs).toContainEqual({
      attr: Atributo.FORCA,
      mod: -1,
    });
    expect(received.getDisplacement()).toBe(6);
    expect(received.getSize().name).toBe('Minúsculo');
  });

  test('Deve aplicar o tamanho Pequeno', () => {
    expect(DUENDE.setup).toBeDefined();
    if (!DUENDE.setup) return;

    const choices = {
      tamanho: 'Pequeno',
      donsAttrs: [Atributo.INTELIGENCIA, Atributo.SABEDORIA],
    };
    const received = DUENDE.setup(DUENDE, [], choices);

    expect(received.attributes.attrs).toHaveLength(2);
    expect(received.getDisplacement()).toBe(6);
    expect(received.getSize().name).toBe('Pequeno');
  });

  test('Deve aplicar o tamanho Médio', () => {
    expect(DUENDE.setup).toBeDefined();
    if (!DUENDE.setup) return;

    const choices = {
      tamanho: 'Médio',
      donsAttrs: [Atributo.INTELIGENCIA, Atributo.SABEDORIA],
    };
    const received = DUENDE.setup(DUENDE, [], choices);

    expect(received.attributes.attrs).toHaveLength(2);
    expect(received.getDisplacement()).toBe(9);
    expect(received.getSize().name).toBe('Médio');
  });

  test('Deve aplicar o tamanho Grande', () => {
    expect(DUENDE.setup).toBeDefined();
    if (!DUENDE.setup) return;

    const choices = {
      tamanho: 'Grande',
      donsAttrs: [Atributo.INTELIGENCIA, Atributo.SABEDORIA],
    };
    const received = DUENDE.setup(DUENDE, [], choices);

    expect(received.attributes.attrs).toHaveLength(3);
    expect(received.attributes.attrs).toContainEqual({
      attr: Atributo.DESTREZA,
      mod: -1,
    });
    expect(received.getDisplacement()).toBe(9);
    expect(received.getSize().name).toBe('Grande');
  });

  describe('Testa a escolha de Natureza', () => {
    test('Deve aplicar a Natureza Animal e os Dons corretamente (sem acumular)', () => {
      expect(DUENDE.setup).toBeDefined();
      if (!DUENDE.setup) return;

      const choices = {
        natureza: 'Animal',
        naturezaAnimalAttr: Atributo.FORCA,
        donsAttrs: [Atributo.DESTREZA, Atributo.CONSTITUICAO],
      };
      const received = DUENDE.setup(DUENDE, [], choices);

      expect(received.attributes.attrs).toHaveLength(3);
      expect(received.attributes.attrs).toContainEqual({
        attr: Atributo.FORCA,
        mod: 1,
      });
      expect(received.attributes.attrs).toContainEqual({
        attr: Atributo.DESTREZA,
        mod: 1,
      });
      expect(received.attributes.attrs).toContainEqual({
        attr: Atributo.CONSTITUICAO,
        mod: 1,
      });
    });

    test('Deve aplicar a Natureza Animal e os Dons corretamente (acumulando)', () => {
      expect(DUENDE.setup).toBeDefined();
      if (!DUENDE.setup) return;

      const choices = {
        natureza: 'Animal',
        naturezaAnimalAttr: Atributo.FORCA,
        donsAttrs: [Atributo.FORCA, Atributo.CONSTITUICAO],
      };
      const received = DUENDE.setup(DUENDE, [], choices);

      expect(received.attributes.attrs).toHaveLength(2);
      expect(received.attributes.attrs).toContainEqual({
        attr: Atributo.FORCA,
        mod: 2,
      });
      expect(received.attributes.attrs).toContainEqual({
        attr: Atributo.CONSTITUICAO,
        mod: 1,
      });
    });

    test('Deve aplicar a Natureza Vegetal', () => {
      expect(DUENDE.setup).toBeDefined();
      if (!DUENDE.setup) return;

      const choices = {
        natureza: 'Vegetal',
        donsAttrs: [Atributo.INTELIGENCIA, Atributo.SABEDORIA],
      };
      const received = DUENDE.setup(DUENDE, [], choices);
      const abilityNames = received.abilities.map((a) => a.name);

      expect(abilityNames).toContain('Natureza Vegetal');
      expect(abilityNames).toContain('Florescer Feérico');
    });

    test('Deve aplicar a Natureza Mineral', () => {
      expect(DUENDE.setup).toBeDefined();
      if (!DUENDE.setup) return;

      const choices = {
        natureza: 'Mineral',
        donsAttrs: [Atributo.INTELIGENCIA, Atributo.SABEDORIA],
      };
      const received = DUENDE.setup(DUENDE, [], choices);
      const abilityNames = received.abilities.map((a) => a.name);

      expect(abilityNames).toContain('Natureza Mineral');
      expect(abilityNames).toContain('Resistência Mineral');
      expect(abilityNames).toContain('Restrição Alimentar');
    });
  });

  test('Deve adicionar os Presentes escolhidos', () => {
    expect(DUENDE.setup).toBeDefined();
    if (!DUENDE.setup) return;

    const choices = { presentes: ['Voo', 'Língua da Natureza'] };
    const received = DUENDE.setup(DUENDE, [], choices);
    const abilityNames = received.abilities.map((a) => a.name);

    expect(abilityNames).toContain('Voo');
    expect(abilityNames).toContain('Língua da Natureza');

    const lingua = received.abilities.find((a) => a.name === 'Língua da Natureza');
    expect(lingua?.sheetBonuses).toBeDefined();
    expect(lingua?.sheetBonuses).toHaveLength(2);
  });

  test('Deve adicionar o presente Visão Feérica corretamente', () => {
    expect(DUENDE.setup).toBeDefined();
    if (!DUENDE.setup) return;

    const choices = { presentes: ['Visão Feérica'] };
    const received = DUENDE.setup(DUENDE, [], choices);
    const visaoFeerica = received.abilities.find(
      (a) => a.name === 'Visão Feérica'
    );

    expect(visaoFeerica).toBeDefined();
    expect(visaoFeerica?.sheetActions).toBeDefined();
    expect(visaoFeerica?.sheetActions).toHaveLength(2);
    expect(visaoFeerica?.sheetActions).toContainEqual({
      source: {
        type: 'race',
        raceName: 'Duende',
      },
      action: {
        type: 'addSense',
        sense: 'Ver o Invisível',
      },
    });
  });

  test('Deve funcionar com múltiplas escolhas', () => {
    expect(DUENDE.setup).toBeDefined();
    if (!DUENDE.setup) return;

    const choices = {
      natureza: 'Animal',
      tamanho: 'Grande',
      presentes: ['Voo'],
      tabu: 'Percepção',
      naturezaAnimalAttr: Atributo.FORCA,
      donsAttrs: [Atributo.FORCA, Atributo.INTELIGENCIA],
    };
    const received = DUENDE.setup(DUENDE, [], choices);
    const abilityNames = received.abilities.map((a) => a.name);

    // Tamanho
    expect(received.getDisplacement()).toBe(9);
    expect(received.getSize().name).toBe('Grande');
    // Dons + Natureza Animal + Penalidade de Tamanho
    expect(received.attributes.attrs).toHaveLength(3);
    expect(received.attributes.attrs).toContainEqual({
      attr: Atributo.DESTREZA,
      mod: -1,
    });
    expect(received.attributes.attrs).toContainEqual({
      attr: Atributo.FORCA,
      mod: 2,
    });
    expect(received.attributes.attrs).toContainEqual({
      attr: Atributo.INTELIGENCIA,
      mod: 1,
    });

    // Presentes
    expect(abilityNames).toContain('Voo');

    // Tabu
    const tabu = received.abilities.find((ability) => ability.name === 'Tabu');
    expect(tabu?.description).toContain('Percepção');
  });
});
