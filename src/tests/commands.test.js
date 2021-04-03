import Docs from 'commands/Docs';
import Examples from 'commands/Examples';
import config from 'config';

describe('commands/Docs', () => {
  it('has fallback on no result', async () => {
    const output = await Docs.execute({ args: ['ThisDoesNotExist'] });

    expect(output.title.includes('ThisDoesNotExist')).toBe(true);
    expect(output.description.length).not.toBe(0);
  });

  it('has fallback on failed query', async () => {
    const output = await Docs.execute({ args: ['Vector3.thisDoesNotExist'] });

    expect(output.title.includes('Vector3.thisDoesNotExist')).toBe(true);
    expect(output.description.length).not.toBe(0);
  });

  it('fuzzy searches alternate docs', async () => {
    const output = await Docs.execute({ args: ['vector'] });

    expect(output.title.includes('vector')).toBe(true);
    expect(output.description.length).not.toBe(0);
  });

  it('gets a specified class', async () => {
    const output = await Docs.execute({ args: ['Vector3'] });

    expect(output.title).toBe('Vector3( x : Float, y : Float, z : Float )');
    expect(output.url).toBe(`${config.docs.url}api/${config.locale}/math/Vector3`);
    expect(output.description).toBeDefined();
  });

  it('strict gets a specified class', async () => {
    const output = await Docs.execute({ args: ['Renderer'] });

    expect(output.title).toBe('WebGLRenderer Constants');
    expect(output.url).toBe(`${config.docs.url}api/${config.locale}/constants/Renderer`);
    expect(output.description).not.toBeDefined();
  });

  it('gets a specified class method', async () => {
    const output = await Docs.execute({ args: ['Vector3.set'] });

    expect(output.title).toBe('Vector3.set ( x : Float, y : Float, z : Float ) : this');
    expect(output.url).toBe(`${config.docs.url}api/${config.locale}/math/Vector3.set`);
    expect(output.description).toBeDefined();
  });

  it('gets a shorthand class method', async () => {
    const output = await Docs.execute({ args: ['Vector3.get'] });

    expect(output.title).toBe('Vector3.getComponent ( index : Integer ) : Float');
    expect(output.url).toBe(
      `${config.docs.url}api/${config.locale}/math/Vector3.getComponent`
    );
    expect(output.description).toBeDefined();
  });

  it('gets a class property', async () => {
    const output = await Docs.execute({ args: ['Vector3.x'] });

    expect(output.title).toBe('Vector3.x : Float');
    expect(output.url).toBe(`${config.docs.url}api/${config.locale}/math/Vector3.x`);
    expect(output.description).not.toBeDefined();
  });

  it('fuzzily gets a specified class', async () => {
    const output = await Docs.execute({ args: ['Vectr3'] });

    expect(output.title).toBe('Vector3( x : Float, y : Float, z : Float )');
    expect(output.url).toBe(`${config.docs.url}api/${config.locale}/math/Vector3`);
    expect(output.description).toBeDefined();
  });

  it('fuzzily gets a specified class method', async () => {
    const output = await Docs.execute({ args: ['Vectr3.set'] });

    expect(output.title).toBe('Vector3.set ( x : Float, y : Float, z : Float ) : this');
    expect(output.url).toBe(`${config.docs.url}api/${config.locale}/math/Vector3.set`);
    expect(output.description).toBeDefined();
  });

  it('fuzzily gets a class property', async () => {
    const output = await Docs.execute({ args: ['Vectr3.x'] });

    expect(output.title).toBe('Vector3.x : Float');
    expect(output.url).toBe(`${config.docs.url}api/${config.locale}/math/Vector3.x`);
    expect(output.description).not.toBeDefined();
  });
});

describe('commands/Examples', () => {
  it('has fallback on no result', async () => {
    const output = await Examples.execute({ args: ['ThisDoesNotExist'] });

    expect(output.title.includes('ThisDoesNotExist')).toBe(true);
    expect(output.description).toBeDefined();
  });

  it('gets multiple results', async () => {
    const output = await Examples.execute({ args: ['webgl'] });

    expect(output.title.includes('webgl')).toBe(true);
    expect(output.description).toBeDefined();
  });

  it('gets a result by key', async () => {
    const output = await Examples.execute({ args: ['webgl_animation_cloth'] });

    expect(output.title).toBe('webgl_animation_cloth');
    expect(output.description.includes('Tags')).toBe(true);
  });

  it('fuzzily gets a result by key', async () => {
    const output = await Examples.execute({ args: ['webgl', 'animation', 'cloth'] });

    expect(output.title).toBe('webgl_animation_cloth');
    expect(output.description.includes('Tags')).toBe(true);
  });
});
