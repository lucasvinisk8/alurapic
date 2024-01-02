
export class Alert {

    constructor(
        public readonly alertType: AlertType,
        public readonly message: string
    ) { }

}

export enum AlertType {

    SUCCESS,
    WARNING,
    DANGER,
    INFO
}

const alert = new Alert(AlertType.SUCCESS, 'Operação concluída com sucesso!');
alert.message;