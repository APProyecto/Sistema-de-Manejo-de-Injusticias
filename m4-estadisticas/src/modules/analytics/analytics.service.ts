import { prisma } from "../../config/prisma";

export async function getUsersByContinent() {
  const result = await prisma.$queryRaw<
    { continent: string; total: bigint }[]
  >`
    SELECT c.ContinentName AS continent, COUNT(u.UserID) AS total
    FROM AppUser u
    JOIN Country co ON u.CountryID = co.CountryID
    JOIN Continent c ON co.ContinentID = c.ContinentID
    GROUP BY c.ContinentID, c.ContinentName
    ORDER BY total DESC
  `;

  return result.map((row) => ({
    continent: row.continent,
    total: Number(row.total),
  }));
}

export async function getCountriesWithMoreFavorites() {
  const result = await prisma.$queryRaw<
    { country: string; total: bigint }[]
  >`
    SELECT co.CountryName AS country, COUNT(*) AS total
    FROM UserFavoriteBoycott uf
    JOIN Boycott b ON uf.BoycottID = b.BoycottID
    JOIN Country co ON b.CountryID = co.CountryID
    GROUP BY co.CountryID, co.CountryName
    ORDER BY total DESC
  `;

  return result.map((row) => ({
    country: row.country,
    total: Number(row.total),
  }));
}

export async function getBoycottsByUserContinent() {
  const result = await prisma.$queryRaw<
    { continent: string; total: bigint }[]
  >`
    SELECT c.ContinentName AS continent, COUNT(b.BoycottID) AS total
    FROM Boycott b
    JOIN AppUser u ON b.CreatorID = u.UserID
    JOIN Country co ON u.CountryID = co.CountryID
    JOIN Continent c ON co.ContinentID = c.ContinentID
    GROUP BY c.ContinentID, c.ContinentName
    ORDER BY total DESC
  `;

  return result.map((row) => ({
    continent: row.continent,
    total: Number(row.total),
  }));
}

export async function getBoycottsByInjusticeCategory() {
  const result = await prisma.$queryRaw<
    { category: string; total: bigint; percentage: number }[]
  >`
    SELECT 
      i.InjusticeName AS category,
      COUNT(b.BoycottID) AS total,
      ROUND(
        COUNT(b.BoycottID) * 100.0 / (SELECT COUNT(*) FROM Boycott),
        2
      ) AS percentage
    FROM Boycott b
    JOIN InjusticeType i ON b.InjusticeTypeID = i.InjusticeTypeID
    GROUP BY i.InjusticeTypeID, i.InjusticeName
    ORDER BY total DESC
  `;

  return result.map((row) => ({
    category: row.category,
    total: Number(row.total),
    percentage: Number(row.percentage),
  }));
}

export async function getBoycottsByInjusticeCategoryAndGender(genderId: number) {
  const result = await prisma.$queryRaw<
    { category: string; total: bigint; percentage: number }[]
  >`
    SELECT 
      i.InjusticeName AS category,
      COUNT(b.BoycottID) AS total,
      ROUND(
        COUNT(b.BoycottID) * 100.0 / (
          SELECT COUNT(*)
          FROM Boycott b2
          JOIN AppUser u2 ON b2.CreatorID = u2.UserID
          WHERE u2.GenderID = ${genderId}
        ),
        2
      ) AS percentage
    FROM Boycott b
    JOIN InjusticeType i ON b.InjusticeTypeID = i.InjusticeTypeID
    JOIN AppUser u ON b.CreatorID = u.UserID
    WHERE u.GenderID = ${genderId}
    GROUP BY i.InjusticeTypeID, i.InjusticeName
    ORDER BY total DESC
  `;

  return result.map((row) => ({
    category: row.category,
    total: Number(row.total),
    percentage: Number(row.percentage),
  }));
}

export async function getBoycottsSummaryByInjusticeCategory() {
  const result = await prisma.$queryRaw<
    { category: string; total: bigint; percentage: number }[]
  >`
    SELECT 
      i.InjusticeName AS category,
      COUNT(b.BoycottID) AS total,
      ROUND(
        COUNT(b.BoycottID) * 100.0 / (SELECT COUNT(*) FROM Boycott),
        2
      ) AS percentage
    FROM Boycott b
    JOIN InjusticeType i ON b.InjusticeTypeID = i.InjusticeTypeID
    GROUP BY i.InjusticeTypeID, i.InjusticeName
    ORDER BY total DESC
  `;

  return result.map((row) => ({
    category: row.category,
    total: Number(row.total),
    percentage: Number(row.percentage),
  }));
}

// 1. Companies ranked by boycott count (descending)
export async function getCompaniesByBoycottCount() {
  const result = await prisma.$queryRaw<
    { company: string; total: bigint }[]
  >`
    SELECT e.EntityName AS company, COUNT(b.BoycottID) AS total
    FROM Boycott b
    JOIN Entity e ON b.EntityID = e.EntityID
    GROUP BY e.EntityID, e.EntityName
    ORDER BY total DESC
  `;
  return result.map((row) => ({
    company: row.company,
    total: Number(row.total),
  }));
}

// 2. Boycotts grouped by industry (LEFT JOIN porque IndustryTypeID es opcional)
export async function getBoycottsByIndustry() {
  const result = await prisma.$queryRaw<
    { industry: string; total: bigint }[]
  >`
    SELECT i.IndustryName AS industry, COUNT(b.BoycottID) AS total
    FROM Boycott b
    JOIN Entity e ON b.EntityID = e.EntityID
    LEFT JOIN IndustryType i ON e.IndustryTypeID = i.IndustryTypeID
    WHERE i.IndustryTypeID IS NOT NULL
    GROUP BY i.IndustryTypeID, i.IndustryName
    ORDER BY total DESC
  `;
  return result.map((row) => ({
    industry: row.industry,
    total: Number(row.total),
  }));
}

// 3. Boycott rankings by vote score (best and worst)
export async function getBoycottRankings() {
  const result = await prisma.$queryRaw<
    {
      boycottId: number;
      title: string;
      publicationDate: Date;
      company: string;
      votesInFavor: number;
      votesAgainst: number;
      avgScore: number;
    }[]
  >`
    SELECT
      b.BoycottID      AS boycottId,
      b.Title          AS title,
      b.PublicationDate AS publicationDate,
      e.EntityName     AS company,
      b.VotesInFavor   AS votesInFavor,
      b.VotesAgainst   AS votesAgainst,
      ROUND(
        b.VotesInFavor / NULLIF(b.VotesInFavor + b.VotesAgainst, 0) * 100,
        2
      ) AS avgScore
    FROM Boycott b
    JOIN Entity e ON b.EntityID = e.EntityID
    WHERE (b.VotesInFavor + b.VotesAgainst) > 0
    ORDER BY avgScore DESC
  `;
  return result.map((row) => ({
    ...row,
    boycottId: Number(row.boycottId),
    votesInFavor: Number(row.votesInFavor),
    votesAgainst: Number(row.votesAgainst),
    avgScore: Number(row.avgScore),
  }));
}

// 4. Leading industry per continent
// Boycott.CountryID → Country.ContinentID (relación directa en el schema)
export async function getLeadingIndustryByContinent() {
  const result = await prisma.$queryRaw<
    { continent: string; industry: string; total: bigint }[]
  >`
    SELECT
      c.ContinentName AS continent,
      i.IndustryName AS industry,
      COUNT(b.BoycottID) AS total
    FROM Boycott b
    JOIN Country co ON b.CountryID = co.CountryID
    JOIN Continent c ON co.ContinentID = c.ContinentID
    JOIN Entity e ON b.EntityID = e.EntityID
    JOIN IndustryType i ON e.IndustryTypeID = i.IndustryTypeID
    WHERE e.IndustryTypeID IS NOT NULL
    GROUP BY c.ContinentID, c.ContinentName, i.IndustryTypeID, i.IndustryName
    HAVING COUNT(b.BoycottID) = (
      SELECT MAX(sub.cnt)
      FROM (
        SELECT COUNT(b2.BoycottID) AS cnt
        FROM Boycott b2
        JOIN Country co2 ON b2.CountryID = co2.CountryID
        JOIN Entity e2 ON b2.EntityID = e2.EntityID
        WHERE co2.ContinentID = c.ContinentID
          AND e2.IndustryTypeID IS NOT NULL
        GROUP BY e2.IndustryTypeID
      ) sub
    )
    ORDER BY c.ContinentName, total DESC
  `;

  return result.map((row) => ({
    continent: row.continent,
    industry: row.industry,
    total: Number(row.total),
  }));
}

// 5. Rejected boycott reports grouped by motive
// ReportBoycott.ReportBoycottID = Report.ReportID (clave compartida en el schema)
export async function getRejectedReportsByMotive() {
  const result = await prisma.$queryRaw<
    { motive: string; total: bigint }[]
  >`
    SELECT m.MotiveName AS motive, COUNT(r.ReportID) AS total
    FROM Report r
    JOIN ReportBoycott rb ON r.ReportID = rb.ReportBoycottID
    JOIN MotiveReport m ON r.MotiveReportID = m.MotiveReportID
    JOIN ReportState rs ON r.ReportStateID = rs.ReportStateID
    WHERE rs.StateName = 'Rechazado'
    GROUP BY m.MotiveReportID, m.MotiveName
    ORDER BY total DESC
  `;
  return result.map((row) => ({
    motive: row.motive,
    total: Number(row.total),
  }));
}

// 6. Top 5 users by boycott count (CreatorID es la FK del creador)
export async function getTop5UsersByBoycotts() {
  const result = await prisma.$queryRaw<
    { userId: number; username: string; total: bigint }[]
  >`
    SELECT u.UserID AS userId, u.UserName AS username, COUNT(b.BoycottID) AS total
    FROM AppUser u
    JOIN Boycott b ON b.CreatorID = u.UserID
    GROUP BY u.UserID, u.UserName
    ORDER BY total DESC
    LIMIT 5
  `;
  return result.map((row) => ({
    userId: Number(row.userId),
    username: row.username,
    total: Number(row.total),
  }));
}

// 7. Average resolution time (Report.ReportedAt → Report.CheckedAt, en días)
export async function getAvgResolutionTimeBoycottReports() {
  const result = await prisma.$queryRaw<
    { avgDays: number | null }[]
  >`
    SELECT ROUND(AVG(DATEDIFF(r.CheckedAt, r.ReportedAt)), 2) AS avgDays
    FROM Report r
    JOIN ReportBoycott rb ON r.ReportID = rb.ReportBoycottID
    WHERE r.CheckedAt IS NOT NULL
      AND r.ReportedAt IS NOT NULL
  `;

  return {
    avgDays: result[0]?.avgDays ?? 0,
  };
}

// 8. Totals by report state (Approved / Rejected / Pending)
export async function getBoycottReportStatusTotals() {
  const result = await prisma.$queryRaw<
    { status: string; total: bigint }[]
  >`
    SELECT rs.StateName AS status, COUNT(r.ReportID) AS total
    FROM Report r
    JOIN ReportBoycott rb ON r.ReportID = rb.ReportBoycottID
    JOIN ReportState rs ON r.ReportStateID = rs.ReportStateID
    GROUP BY rs.ReportStateID, rs.StateName
    ORDER BY total DESC
  `;
  return result.map((row) => ({
    status: row.status,
    total: Number(row.total),
  }));
}