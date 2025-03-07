class IdGenerator {
    constructor(private prefix = 'id', private counter = 0) {}

    generateUuid() {
        return `${this.prefix}_${crypto.randomUUID()}_${this.counter++}`;
    }

    generate(prefix = '') {
        return `${prefix || this.prefix}_${this.counter++}`;
    }
}

const generator = new IdGenerator();

export function asId(prefix = '') {
    return generator.generate(prefix);
}