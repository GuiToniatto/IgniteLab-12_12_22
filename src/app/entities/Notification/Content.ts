export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  constructor(content: string) {
    const isContentValid = this.validateContent(content);
    if (!isContentValid) {
      throw new Error('Content length error.');
    }
    this.content = content;
  }

  private validateContent(content: string): boolean {
    return content.length > 5 && content.length <= 240;
  }
}
