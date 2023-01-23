import { test } from "@japa/runner";

class Message {
  constructor(public id: number, public type: number, public text: string, public options: string[]) { }
}
const messages = []
class Session {
  constructor(public state: string) { }

}
interface SessionUserSendMessageDataGateway {
  getActiveSessionFromUser({ user }: { user: string }): Session | null
  createSessionWithUser({ user }): Session
}
class UserSendMessage {
  constructor(private readonly sessionGateWay: SessionUserSendMessageDataGateway) { }
  handle({ user, message }: { user: string, message: string }): string {
    const session = sessionGateway.getActiveSessionFromUser({ user })

    if (!session) {
      this.sessionGateWay.createSessionWithUser({ user })

    }

  }
}
class SessionUserSendMessageDataGatewaySpy implements SessionUserSendMessageDataGateway {
  getActiveSessionFromUser({ user }: { user: string; }): Session | null {
    return null;
  }
  createSessionWithUser({ user }: { user: any; }): Session {
    return new Session('');
  }
}
test('create session if it doesnt exist', async () => {
  const input = { user: "+5522998695268", message: "1" };
  const userSendMessage = new UserSendMessage(new SessionUserSendMessageDataGatewaySpy());
  const result = userSendMessage.handle(input);
  expect(typeof result).toBe("string")


})
