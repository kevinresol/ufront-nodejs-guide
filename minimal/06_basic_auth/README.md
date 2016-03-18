# Minimal example: Basic Authentication

In this example, we will set up a minimal server that will have basic authentication.

Note that "sessions" are not implemented in this minimal example, therefore the log-in status
is only applicable to the current request. In other words, the log-in status will not persist across pages.

### Prerequisites

- [Client App](04_client_app)

## Overview

The minimal code required for authentication mainly involves:
- 2 interfaces: `UFAuthUser` & `UFAuthHandler` (see the `auth` package)
- and the code to initialize them (see `AuthApi`)