
/**
 * ForbocAI Core Types
 * The foundational interfaces for the Neuro-Symbolic Protocol.
 */

// --- CORTEX (Inference) ---

export interface CortexConfig {
    /** The model to load (e.g., 'smollm2-135m', 'llama3-8b-q4') */
    model: string;
    /** Optional overrides for model parameters */
    temperature?: number; // Default 0.7
    maxTokens?: number;   // Default 1024
    gpu?: boolean;        // Default true (uses WebLLM/WebGPU)
}

export interface CortexStatus {
    id: string;
    model: string;
    ready: boolean;
    engine: 'webballm' | 'mock' | 'remote';
}

export interface CompletionOptions {
    temperature?: number;
    maxTokens?: number;
    stop?: string[];
    jsonSchema?: object; // For structured outputs
}

export interface Cortex {
    id: string;
    init(): Promise<void>;
    complete(prompt: string, options?: CompletionOptions): Promise<string>;
    completeStream(prompt: string, options?: CompletionOptions): AsyncGenerator<string>;
}

// --- AGENT (Entity) ---

export type Mood = 'hostile' | 'suspicious' | 'neutral' | 'friendly' | 'loyal';

export interface AgentState {
    inventory: string[];
    skills: Record<string, number>;
    relationships: Record<string, number>;
    mood: Mood;
    [key: string]: unknown; // Extensible state
}

export interface AgentConfig {
    cortex: Cortex;
    persona: string; // The system prompt / character description
    initialState?: Partial<AgentState>;
    memoryConfig?: MemoryConfig;
}

export interface AgentResponse {
    dialogue: string;
    action?: AgentAction;
    thought?: string; // Chain-of-thought (internal monologue)
}

export interface AgentAction {
    type: string;
    target?: string;
    payload?: Record<string, unknown>;
    reason?: string;
}

// --- MEMORY (RAG) ---

export type MemoryType = 'observation' | 'experience' | 'knowledge' | 'emotion';

export interface MemoryConfig {
    /** Decay strategy: 'none' | 'temporal' */
    decay?: 'none' | 'temporal';
    /** Max memories to keep in active context during retrieval */
    maxContextWindow?: number;
}

export interface MemoryItem {
    id: string;
    text: string;
    embedding?: number[]; // Vector
    timestamp: number;
    type: MemoryType;
    importance: number; // 0-1
}

// --- SOUL (Portability) ---

export interface Soul {
    id: string;
    version: string; // Schema version
    name: string;
    persona: string;
    memories: MemoryItem[];
    state: AgentState;
    signature?: string; // Cryptographic proof of ownership
}
