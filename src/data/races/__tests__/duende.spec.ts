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
    const nomesHabilidades = DUENDE.abilities.map(a => a.name);
    expect(nomesHabilidades).toContain('Natureza');
    expect(nomesHabilidades).toContain('Tamanho');
    expect(nomesHabilidades).toContain('Dons');
    expect(nomesHabilidades).toContain('Presentes de Magia e de Caos');
  });

  test('Deve incluir as três limitações obrigatórias', () => {
    const nomesHabilidades = DUENDE.abilities.map(a => a.name);
    expect(nomesHabilidades).toContain('Aversão a Ferro');
    expect(nomesHabilidades).toContain('Aversão a Sinos');
    expect(nomesHabilidades).toContain('Tabu');
  });
});

describe('Testa o setup da raça Duende', () => {
  test('Deve aplicar o Tabu corretamente', () => {
    expect(DUENDE.setup).toBeDefined();

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

    const choices = { tamanho: 'Minúsculo' };
    const received = DUENDE.setup(DUENDE, [], choices);

    expect(received.attributes.attrs).toEqual([
      { attr: Atributo.DESTREZA, mod: 2 },
      { attr: Atributo.FORCA, mod: -2 },
    ]);
    expect(received.getDisplacement()).toBe(6);
    expect(received.getSize().name).toBe('Minúsculo');
  });

  test('Deve aplicar o tamanho Pequeno', () => {
    expect(DUENDE.setup).toBeDefined();

    const choices = { tamanho: 'Pequeno' };
    const received = DUENDE.setup(DUENDE, [], choices);

    expect(received.attributes.attrs).toEqual([
      { attr: Atributo.DESTREZA, mod: 1 },
      { attr: Atributo.FORCA, mod: -1 },
    ]);
    expect(received.getDisplacement()).toBe(9);
    expect(received.getSize().name).toBe('Pequeno');
  });

  test('Deve aplicar o tamanho Médio', () => {
    expect(DUENDE.setup).toBeDefined();

    const choices = { tamanho: 'Médio' };
    const received = DUENDE.setup(DUENDE, [], choices);

    expect(received.attributes.attrs).toEqual([]);
    expect(received.getDisplacement()).toBe(9);
    expect(received.getSize().name).toBe('Médio');
  });

  test('Deve aplicar o tamanho Grande', () => {
    expect(DUENDE.setup).toBeDefined();

    const choices = { tamanho: 'Grande' };
    const received = DUENDE.setup(DUENDE, [], choices);

    expect(received.attributes.attrs).toEqual([
      { attr: Atributo.FORCA, mod: 1 },
      { attr: Atributo.DESTREZA, mod: -1 },
    ]);
    expect(received.getDisplacement()).toBe(12);
    expect(received.getSize().name).toBe('Grande');
  });
});
