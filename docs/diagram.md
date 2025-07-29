# High-Level Design Diagram

## Three-Layer Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    CLIENT SIDE LAYER                                            │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐ │
│  │   WebViewer     │  │   PDF Viewer    │  │   Annotation    │  │      Static Assets          │ │
│  │   Interface     │  │   Component     │  │   Tools         │  │                             │ │
│  │                 │  │                 │  │                 │  │ • webviewer.min.js          │ │
│  │ • User Interface│  │ • Document      │  │ • Highlight     │  │ • serverless.pdf            │ │
│  │ • Event Handling│  │   Display       │  │ • Underline     │  │ • CSS Styles                │ │
│  │ • XFDF Export   │  │ • Zoom/Pan      │  │ • Strikeout     │  │ • HTML Templates            │ │
│  │ • XFDF Import   │  │ • Navigation    │  │ • Text          │  │                             │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────────────────┘ │
│                                                                                                 │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                              HTTP Requests / Responses                                     │ │
│  │                                                                                            │ │
│  │  POST /api/annotations ←→ XFDF Data                                                        │ │
│  │  GET /api/annotations  ←→ JSON Array                                                       │ │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ HTTP/JSON
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                     API LAYER                                                   │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐ │
│  │   Express       │  │   Annotation    │  │   Middleware    │  │      Configuration          │ │
│  │   Server        │  │   Handler       │  │                 │  │                             │ │
│  │                 │  │                 │  │                 │  │ • Environment Variables     │ │
│  │ • HTTP Server   │  │ • CRUD          │  │ • CORS          │  │ • Database Connection       │ │
│  │ • Route Handler │  │   Operations    │  │ • Body Parser   │  │ • SSL Settings              │ │
│  │ • Static Files  │  │ • XFDF          │  │ • JSON Parser   │  │ • Pool Management           │ │
│  │ • Error Handler │  │   Processing    │  │ • Error Handler │  │ • Logging                   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────────────────┘ │
│                                                                                                 │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                              Business Logic                                                │ │
│  │                                                                                            │ │
│  │  • Validate XFDF Data                                                                      │ │
│  │  • Handle Annotation CRUD                                                                  │ │
│  │  • Manage Database Connections                                                             │ │
│  │  • Process Delete Commands                                                                 │ │
│  │  • Format JSON Responses                                                                   │ │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ SQL Queries
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   DATABASE LAYER                                                │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                 │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                              PostgreSQL Database                                           │ │
│  │                                                                                            │ │
│  │  ┌───────────────────────────────────────────────────────────────────────────────────────┐ │ │
│  │  │                           annotations Table                                           │ │ │
│  │  │                                                                                       │ │ │
│  │  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐  │ │ │
│  │  │  │     id      │ │ document_id │ │annotation_id│ │ xfdf_data   │ │   created_at    │  │ │ │
│  │  │  │   (PK)      │ │   (TEXT)    │ │   (UNIQUE)  │ │   (TEXT)    │ │  (TIMESTAMP)    │  │ │ │
│  │  │  │  SERIAL     │ │             │ │             │ │             │ │                 │  │ │ │
│  │  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────────┘  │ │ │
│  │  │                                                                                       │ │ │
│  │  │  • Primary Key: id (auto-increment)                                                   │ │ │
│  │  │  • Unique Constraint: annotation_id                                                   │ │ │
│  │  │  • Indexes: document_id, created_at                                                   │ │ │
│  │  │  • Data Type: XFDF (XML) for annotations                                              │ │ │
│  │  └───────────────────────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                                            │ │
│  │  ┌───────────────────────────────────────────────────────────────────────────────────────┐ │ │
│  │  │                              Database Operations                                      │ │ │
│  │  │                                                                                       │ │ │
│  │  │  • INSERT: Save new annotations                                                       │ │ │
│  │  │  • SELECT: Retrieve annotations by document_id                                        │ │ │
│  │  │  • UPDATE: Modify existing annotations                                                │ │ │
│  │  │  • DELETE: Remove annotations                                                         │ │ │
│  │  │  • UPSERT: Insert or update on conflict                                               │ │ │
│  │  └───────────────────────────────────────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### **Client Side Layer**
- **User Interface**: WebViewer PDF viewer and annotation tools
- **Data Processing**: XFDF export/import for annotations
- **HTTP Communication**: API requests and responses
- **Static Assets**: PDF files, JavaScript libraries, CSS

### **API Layer**
- **Request Handling**: HTTP routing and middleware
- **Business Logic**: Annotation CRUD operations
- **Data Validation**: Input validation and error handling
- **Database Interface**: Connection management and queries

### **Database Layer**
- **Data Storage**: Persistent annotation storage
- **Data Integrity**: Constraints and relationships
- **Query Processing**: SQL execution and optimization
- **Transaction Management**: ACID compliance

## Data Flow Between Layers

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    DATA FLOW BETWEEN LAYERS                                     │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                 │
│  ┌───────────────────┐  XFDF/JSON   ┌────────────────────┐  SQL Queries   ┌───────────────────┐ │
│  │                   │◄───────────► │                    │◄─────────────► │                   │ │
│  │      Client       │              │       API          │                │    Database       │ │
│  │                   │              │                    │                │                   │ │
│  │ • User Actions    │              │ • Process Requests │                │ • Data Storage    │ │
│  │ • XFDF Export     │              │ • Business Logic   │                │ • Data Retrieval  │ │
│  │ • API Calls       │              │ • Database Ops     │                │ • Data Integrity  │ │
│  │ • Event Handling  │              │ • Response Format  │                │ • Query Optimize  │ │
│  └───────────────────┘              └────────────────────┘                └───────────────────┘ │
│                                                                                                 │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                              Data Flow Summary                                             │ │
│  │                                                                                            │ │
│  │  Client → API: HTTP/JSON with XFDF annotation data                                         │ │
│  │  API → Database: SQL queries for CRUD operations                                           │ │
│  │  Database → API: Query results and status responses                                        │ │
│  │  API → Client: JSON responses with annotation data                                         │ │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## Key Design Principles

### **Separation of Concerns**
- **Client**: UI and user interaction
- **API**: Business logic and data processing
- **Database**: Data persistence and storage

### **Loose Coupling**
- **Client ↔ API**: HTTP/JSON communication
- **API ↔ Database**: SQL queries
- **Independent layers**: Changes in one layer don't affect others

### **Scalability**
- **Client**: Can be served via CDN
- **API**: Can be horizontally scaled
- **Database**: Can be optimized and replicated

### **Security**
- **Client**: Input validation and sanitization
- **API**: Authentication and authorization
- **Database**: Connection security and data encryption 