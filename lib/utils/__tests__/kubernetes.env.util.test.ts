import { getPodInfo } from '../kubernetes.env.util';

describe('kubernetes.env.util', () => {
  it('# should load empty object when not in real pod', () => {
    const podInfo = getPodInfo();
    expect(podInfo).toEqual({});
  });

  it('# should load object when in mock pod', () => {
    process.env.POD_NAMESPACE = 'foo';
    const podInfo = getPodInfo();
    expect(podInfo).toEqual({
      POD_NAMESPACE: 'foo'
    });
  });
});
