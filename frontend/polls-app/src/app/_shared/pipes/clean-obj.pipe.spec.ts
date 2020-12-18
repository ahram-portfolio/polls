import { CleanObjPipe } from './clean-obj.pipe';

describe('CleanObjPipe', () => {
  it('create an instance', () => {
    const pipe = new CleanObjPipe();
    expect(pipe).toBeTruthy();
  });

  it('value가 비어있는 property를 삭제하는가?', () => {
    const pipe = new CleanObjPipe();
    const cleanObj = pipe.transform({
      value: 'Value',
      nullValue: null,
      nullString: 'null',
      emptyString: '',
      undefinedString: 'undefined'
    });

    let propertyCnt = 0;
    for (const prop in cleanObj) {
      propertyCnt++;
    }

    expect(propertyCnt).toBe(1);
  })
});
