import { Router } from "express";
import { orchestrateThreatIntelligence } from "../services/iocOrchestrator";
import { computeScore } from "../services/scoringEngine";
import { logIocHistory } from "../services/iocHistoryService";
import { ALL_PROVIDERS } from "../services/providerExecutor";
import type { IocType } from "../constants/provider.interface";

const router = Router();

router.post("/", async (req, res) => {
  const { ioc, type } = req.body;
  const owner = req.owner;

  if (!ioc || typeof ioc !== "string" || ioc.trim() === "") {
    return res.status(400).json({ error: "Missing or invalid 'ioc' field" });
  }

  let userSelectedType: IocType | undefined;
  if (type && typeof type === "string") {
    userSelectedType = type as IocType;
  }

  try {
    const orchestratedResult = await orchestrateThreatIntelligence(
      ioc,
      ALL_PROVIDERS,
      owner,
      userSelectedType ? { userSelectedType } : {},
    );

    const scoringResult = computeScore({
      providers: orchestratedResult.providers,
    });

    if (orchestratedResult.detectedType) {
      void logIocHistory({
        owner,
        iocType: orchestratedResult.detectedType,
        iocValue: ioc,
        verdict: scoringResult.verdict,
      }).catch(() => {
        // intentionally ignored
      });
    }

    const response = {
      ioc: orchestratedResult.ioc,
      type: orchestratedResult.detectedType,
      score: scoringResult.finalScore,
      verdict: scoringResult.verdict,
      providers: orchestratedResult.providers,
      meta: {
        ...orchestratedResult.meta,
        validation: orchestratedResult.validation,
        scoring: {
          processedProviders: scoringResult.processedProviders,
          warnings: scoringResult.warnings,
          scoringMeta: scoringResult.meta,
        },
      },
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Lookup failed", details: String(error) });
  }
});

export default router;
