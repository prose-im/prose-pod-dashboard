import axios from 'axios';

class Login {

  async authenticate(
    password: string,
    attemptOnceOnly = false
  ): Promise<void> {
    // Incomplete parameters?
    if (!password) {
      throw new Error("Please provide a password");
    }

    // Attempt connecting (this might fail, eg. wrong credentials)
    await axios.post('/login', {
      password
    });

    // Store credentials AFTER connection attempt succeeded
    if (attemptOnceOnly === true) {
      // doStoreCredentials();
    }
  
    // // Another connection active?
    // if (
    //   Store.$session.connected === true ||
    //   Store.$session.connecting === true
    // ) {
    //   throw new Error("Another connection already exists");
    // }

    // // Make credentials store handler
    // const doStoreCredentials = () => {
    //   // Store credentials
    //   this.__credentials = {
    //     jid,
    //     password
    //   };

    //   // Store authentication JID
    //   this.authenticationJID = this.__credentials?.jid;
    // };

    // // Store credentials BEFORE attempting to connect? (this allows retries)
    // if (attemptOnceOnly !== true) {
    //   doStoreCredentials();
    }
}

export default new Login();