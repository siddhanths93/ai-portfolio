import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type GdeltArticle = {
  title?: string;
  url?: string;
  domain?: string;
  seendate?: string;
  sourcecountry?: string;
  language?: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") || "Nvidia";

  const params = new URLSearchParams({
    query: topic,
    mode: "artlist",
    format: "json",
    maxrecords: "20",
    sort: "hybridrel",
  });

  const gdeltUrl = `http://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`;

  try {
    const response = await fetch(gdeltUrl, {
      cache: "no-store",
    });

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "GDELT returned an error",
          status: response.status,
          details: text.slice(0, 500),
          url: gdeltUrl,
        },
        { status: 500 }
      );
    }

    const data = JSON.parse(text);

    const articles = (data.articles || []).map((article: GdeltArticle) => ({
      title: article.title || "Untitled article",
      url: article.url || "#",
      source: article.domain || "Unknown source",
      publishedDate: article.seendate || "Unknown date",
      country: article.sourcecountry || "Unknown",
      language: article.language || "Unknown",
    }));

    return NextResponse.json({
      topic,
      articleCount: articles.length,
      articles,
      gdeltUrl,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong while fetching market signals",
        details: error instanceof Error ? error.message : String(error),
        url: gdeltUrl,
      },
      { status: 500 }
    );
  }
}