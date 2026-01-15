import { detectIocType, validateIocType } from "../utils/iocUtils";
import {
  executeProviders,
  type ProviderExecutionResult,
} from "./providerExecutor";
import type {
  IocType,
  ThreatIntelProvider,
} from "../constants/provider.interface";
import type { OwnerContext } from "../constants/owner";

export interface OrchestratedResponse<TResponse = unknown> {
  ioc: string;
  detectedType: IocType | null;
  validation: {
    isValid: boolean;
    userSelectedType?: IocType;
  };
  providers: ProviderExecutionResult<TResponse>[];
  meta: {
    executedAt: string;
    executionTimeMs: number;
    detected: {
      ipVersion?: 4 | 6;
    } | null;
  };
}

export interface OrchestratorOptions<TOptions = Record<string, unknown>> {
  userSelectedType?: IocType;
  providerOptions?: TOptions;
  timeoutMs?: number;
}

export async function orchestrateThreatIntelligence<
  TResponse = unknown,
  TOptions = Record<string, unknown>
>(
  ioc: string,
  providers: ReadonlyArray<ThreatIntelProvider<TResponse, TOptions>>,
  owner: OwnerContext,
  options: OrchestratorOptions<TOptions> = {}
): Promise<OrchestratedResponse<TResponse>> {
  const startTime = Date.now();

  // Detect IOC type
  const detected = detectIocType(ioc);

  // Validate user-selected type (if provided)
  let validation = { isValid: true };
  if (options.userSelectedType) {
    validation = validateIocType(ioc, options.userSelectedType);
  }

  // If detection fails, return early (NO history write)
  if (!detected.type) {
    return {
      ioc,
      detectedType: null,
      validation: {
        ...validation,
        userSelectedType: options.userSelectedType,
      },
      providers: [],
      meta: {
        executedAt: new Date().toISOString(),
        executionTimeMs: Date.now() - startTime,
        detected: null,
      },
    };
  }

  // Execute providers (core lookup behavior)
  const providerResults = await executeProviders(
    providers,
    ioc,
    detected.type,
    {
      timeoutMs: options.timeoutMs,
      providerOptions: options.providerOptions,
    }
  );

  const executionTimeMs = Date.now() - startTime;

  // Return lookup response normally
  return {
    ioc,
    detectedType: detected.type,
    validation: {
      ...validation,
      userSelectedType: options.userSelectedType,
    },
    providers: providerResults,
    meta: {
      executedAt: new Date().toISOString(),
      executionTimeMs,
      detected: {
        ipVersion: detected.ipVersion,
      },
    },
  };
}
