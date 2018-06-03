import { Injectable } from '@angular/core';


@Injectable()
export class DialogService {

    confirm(message?: string) { // PARAMETRO ? TORNA OPCIONAL O PARAMETRO
        return new Promise(resolve => {
            return resolve(window.confirm(message || 'Confirmar?'));
        });
    }
}