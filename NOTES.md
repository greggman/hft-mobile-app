
*   bridgeSecret

    for my use case I needed to comment out the bridge secret stuff.

    I just made CordovaBridge.java verifySecret return true if jsMessageQueue.isBridgeEnabled()
    return true.

