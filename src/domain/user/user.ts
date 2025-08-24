import buffer = require("buffer");

export class User {
    constructor(
        public id: number,
        public nickname: string,
        public passwd: buffer.Buffer
    ) {}
}

/**
 * Entidad de dominio: User
 * No depende de Express ni de la base de datos
 */