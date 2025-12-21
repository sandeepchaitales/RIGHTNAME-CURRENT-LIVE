import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const LandingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brand_names: '',
    category: '',
    positioning: 'Premium',
    market_scope: 'Multi-Country',
    countries: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const brands = formData.brand_names.split(',').map(s => s.trim()).filter(Boolean);
      const countries = formData.countries.split(',').map(s => s.trim()).filter(Boolean);

      if (brands.length === 0 || countries.length === 0) {
        toast.error("Please enter at least one brand and one country.");
        setLoading(false);
        return;
      }

      const payload = {
        brand_names: brands,
        category: formData.category,
        positioning: formData.positioning,
        market_scope: formData.market_scope,
        countries: countries
      };

      const result = await api.evaluate(payload);
      navigate('/dashboard', { state: { data: result, query: payload } });
    } catch (error) {
      toast.error("Evaluation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-serif font-bold text-slate-900 mb-4">RIGHTNAME</h1>
          <p className="text-lg text-slate-600">Consulting-grade brand evaluation system.</p>
        </div>

        <Card className="border-t-4 border-t-blue-600 shadow-xl">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">New Evaluation</CardTitle>
            <CardDescription>Enter project details to generate comprehensive analysis.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="brand_names">Brand Names (comma separated)</Label>
                  <Input 
                    id="brand_names" 
                    name="brand_names" 
                    placeholder="e.g. LUMINA, VESTRA" 
                    value={formData.brand_names}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    name="category" 
                    placeholder="e.g. FinTech, Luxury Fashion" 
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                  <Label>Positioning</Label>
                  <Select onValueChange={(val) => handleSelectChange('positioning', val)} defaultValue={formData.positioning}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select positioning" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mass">Mass Market</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                      <SelectItem value="Ultra-Premium">Ultra-Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Market Scope</Label>
                  <Select onValueChange={(val) => handleSelectChange('market_scope', val)} defaultValue={formData.market_scope}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single Country">Single Country</SelectItem>
                      <SelectItem value="Multi-Country">Multi-Country</SelectItem>
                      <SelectItem value="Global">Global</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="countries">Target Countries (comma separated)</Label>
                <Input 
                  id="countries" 
                  name="countries" 
                  placeholder="e.g. USA, Japan, Germany" 
                  value={formData.countries}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="pt-4">
                <Button 
                    type="submit" 
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-6 text-lg"
                    disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Generate Analysis"
                  )}
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center text-sm text-slate-400">
             Powered by Anthropic Claude 3.5 Sonnet & Emergent
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
