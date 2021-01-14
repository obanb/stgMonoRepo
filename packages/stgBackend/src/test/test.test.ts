import * as S from 'fp-ts/lib/State';
import {pipe} from 'fp-ts/lib/pipeable';

interface Log {
    running: boolean,
    completed: boolean,
    result: number
}
const appLog: Log = {
    running: false,
    completed: false,
    result: 0
}

describe('Smlouva with unlimited validity', () => {

    const initProcess = <A extends Log>(initValue: number): S.State<A,number> => (log) => {
        const logVersion = {...log, running: true}
        // console.log(JSON.stringify(logVersion))
        return [initValue, logVersion]
    };

    const completeProcess = <A extends Log>(initValue: number): S.State<A, number> => (log) => {
        const logVersion = {...log, running: false, completed: true, result: initValue}
        // console.log(JSON.stringify(logVersion))

        return [initValue, logVersion]
    };

    const double = (number: number) => number * 2;
    const tripple = (number: number) => number * 3;

     const map3 = <A,B>(f:(a: A) => B) => <E>(fa: S.State<E,A>):S.State<E, B> => {
        console.log(`iterace`);
        return (s1) => {
            console.log(`${s1}`);
            const [a, s2] = fa(s1)
            console.log(a);
            console.log(f(a))
            return [f(a), s2]
        }
    }

    type tester = (b:string) => string;
    const a = (n:string) => (b:string) => n + b;

     // const mapec = (t: tester) => {
     //     const val = t('pes') + '1';
     //     return  => [t,val]
     // }

     // const testik = pipe(
     //     a('les'),
     //     mapec,
     // )

    it('Hodnota before smlouva', () => {



        const result = () => pipe(
            initProcess(10),
            map3(double),
            map3(tripple),
            map3(tripple),
            map3(tripple),
            S.chain(completeProcess)
        )

        // (val) => [1,2]
        // (val) => [2,3]
        // (val) => [3,4]

        // const test = result();
        // console.log(JSON.stringify(result))


        // const fest = result()(appLog);

        expect(result()(appLog)).toBeNull();
    });
});