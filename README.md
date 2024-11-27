# Policy Management System

This project is a **Policy Management System** built with **NestJS** to manage insurance policies, handle CRUD operations, schedule tasks with Cron jobs, process events with listeners, and efficiently manage queues and caching using Redis.

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
5. [Environment Variables](#environment-variables)
6. [Modules and Features](#modules-and-features)
   - [CRUD Operations](#crud-operations)
   - [Scheduling with Cron Jobs](#scheduling-with-cron-jobs)
   - [Event-Driven Architecture](#event-driven-architecture)
   - [Queues and Redis](#queues-and-redis)

---

## Overview

The **Policy Management System** provides for managing insurance policies. It incorporates advanced functionalities like asynchronous task processing, event-driven architecture, and caching to deliver a high-performing and scalable application.

---

## Features
- **CRUD Operations**:
  - Perform Create, Read, Update, and Delete operations for policies.
- **Scheduling with Cron Jobs**:
  - Automate periodic tasks, like invoice reminders or policy expiration checks.
- **Event-Driven Architecture**:
  - Emit and listen to events for seamless inter-module communication.
- **Queue Management**:
  - Handle asynchronous tasks, such as invoice generation and email notifications.
- **Redis Integration**:
  - Efficiently manage queues and implement caching for optimized performance.

---

## Technologies Used
- **Backend**: [NestJS]
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Queue Management**: BullMQ
- **Task Scheduling**: @nestjs/schedule
- **Redis**: For caching and queue management
- **Node.js**: Runtime environment
- **TypeScript**: Strongly typed programming

---

## Setup and Installation

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/wondwosen-bewketu/policy-managment-system.git
   cd policy-management-system
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up the database:
   - Create a PostgreSQL database and update the `.env` file with the connection details.

5. Run database migrations:
   ```bash
   pnpm migration:run
   ```

6. Start the application:
   ```bash
   pnpm start:dev
   ```

---

## Environment Variables

Create a `.env` file in the root directory with the following values:

```env
# App Config

# .env file
NODE_ENV=development
APP_PORT=8080
APP_NAME=NestJS Boilerplate

# Database
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=mysecretpassword
DATABASE_NAME=postgress

REDIS_URL=
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
REDIS_USERNAME=
REDIS_PASSWORD=


DATABASE_ENTITIES_DIR=src/database/entities
DATABASE_MIGRATIONS=src/database/migrations/**/*.ts
DATABASE_MIGRATIONS_DIR=src/database/migrations
DATABASE_SEEDING_FACTORIES=src/database/factories/**/*.ts
DATABASE_SEEDING_SEEDS=src/database/seeds/**/*.ts

EMAIL_USER=bewketuwondwosen@gmail.com
EMAIL_APP_PASSWORD=uaeb jbqn ugox lhwn

```

---

## Modules and Features

### CRUD Operations
- **Policies Module**:
  - **Create**: Add new policies to the system.
  - **Read**: Retrieve single or multiple policies with filters.
  - **Update**: Modify policy details.
  - **Delete**: Soft delete policies, preserving data for audit purposes.

### Scheduling with Cron Jobs
- **Task Automation**:
  - Invoice reminders and overdue notifications are scheduled using Cron jobs.
  - Example: A daily task to check and notify about pending invoices.

### Event-Driven Architecture
- **Policy Events**:
  - Emit events like `policy.approved` or `policy.rejected` to trigger corresponding actions (e.g., invoice generation).
- **Event Listeners**:
  - Listen for events and process actions like sending notifications or logging.

### Queues and Redis
- **Queues**:
  - Tasks such as invoice generation and email notifications are processed asynchronously using BullMQ.
  - Queue retry mechanisms with backoff strategies are implemented for fault tolerance.
- **Redis Caching**:
  - Cache frequently accessed data (e.g., policy details) to improve performance.
  - Reduce database queries for commonly used endpoints.

