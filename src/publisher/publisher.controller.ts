import { Body, Controller, Post } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';

@Controller('publisher')
export class PublisherController {
  private pubSubClient = new PubSub();
  private readonly topicName = 'demo-topic';

  @Post()
  async publishMessage(@Body() payload: any): Promise<string> {
    const dataBuffer = Buffer.from(JSON.stringify(payload));
    const messageId = await this.pubSubClient
      .topic(this.topicName)
      .publishMessage({ data: dataBuffer });
    return `Message ${messageId} published.`;
  }
}
