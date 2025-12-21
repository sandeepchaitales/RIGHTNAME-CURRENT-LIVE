import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const BrandRadarChart = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#0F172A"
            strokeWidth={2}
            fill="#0F172A"
            fillOpacity={0.1}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ScoreCard = ({ title, score, verdict, subtitle }) => {
    let colorClass = "text-slate-900";
    if (verdict === "GO") colorClass = "text-emerald-600";
    if (verdict === "CONDITIONAL GO") colorClass = "text-amber-600";
    if (verdict === "NO-GO" || verdict === "REJECT") colorClass = "text-red-600";

    return (
        <Card className="border-t-4 border-t-primary shadow-sm h-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-serif font-bold text-primary">{score}</span>
                    <span className="text-sm text-muted-foreground">/100</span>
                </div>
                {verdict && (
                    <div className={`mt-2 font-bold ${colorClass}`}>
                        {verdict}
                    </div>
                )}
                {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
            </CardContent>
        </Card>
    );
};

export const CompetitionAnalysis = ({ data }) => {
    return (
        <Card className="border-slate-200 shadow-md overflow-hidden">
            <CardHeader className="bg-slate-900 text-white">
                <CardTitle className="text-lg font-serif">Competitive Landscape Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="p-6 bg-slate-50 border-b border-slate-200">
                     <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Competitive White Space</h4>
                     <p className="text-slate-800 font-medium text-lg leading-relaxed">{data.white_space_analysis}</p>
                </div>

                <div className="p-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px] font-bold text-slate-900">Competitor</TableHead>
                                <TableHead className="font-bold text-slate-900">Positioning</TableHead>
                                <TableHead className="text-right font-bold text-slate-900">Price Range</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.competitors && data.competitors.map((comp, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="font-medium">{comp.name}</TableCell>
                                    <TableCell>{comp.positioning}</TableCell>
                                    <TableCell className="text-right font-mono text-slate-600">{comp.price_range}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 border-t border-slate-200">
                     <div className="p-6 border-r border-slate-200 bg-emerald-50/50">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Strategic Advantage</h4>
                        <p className="text-sm text-slate-700">{data.strategic_advantage}</p>
                     </div>
                     <div className="p-6 flex items-center justify-center bg-slate-50">
                        <div className="text-center">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Suggested Pricing</h4>
                            <span className="text-2xl font-serif font-bold text-slate-900">{data.suggested_pricing}</span>
                        </div>
                     </div>
                </div>
            </CardContent>
        </Card>
    );
};
