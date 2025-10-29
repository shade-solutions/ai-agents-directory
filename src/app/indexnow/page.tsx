'use client';

import { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
import { Send, CheckCircle, AlertCircle, Loader2, Upload, Globe } from 'lucide-react';

interface SubmissionResult {
  url: string;
  status: 'success' | 'error' | 'pending';
  message?: string;
}

export default function IndexNowSubmissionPage() {
  const [customUrls, setCustomUrls] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<SubmissionResult[]>([]);
  const [selectedType, setSelectedType] = useState<'all' | 'custom'>('all');

  const handleSubmitAll = async () => {
    setIsSubmitting(true);
    setResults([]);

    try {
      const response = await fetch('/api/indexnow/submit-all', {
        method: 'POST',
      });

      const data = await response.json() as { success: boolean; urls?: string[]; error?: string };

      if (data.success && data.urls) {
        setResults(
          data.urls.map((url: string) => ({
            url,
            status: 'success',
            message: 'Successfully submitted to IndexNow',
          }))
        );
      } else {
        setResults([
          {
            url: 'Batch submission',
            status: 'error',
            message: data.error || 'Failed to submit URLs',
          },
        ]);
      }
    } catch (error) {
      setResults([
        {
          url: 'Batch submission',
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error occurred',
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitCustom = async () => {
    const urls = customUrls
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    if (urls.length === 0) {
      alert('Please enter at least one URL');
      return;
    }

    setIsSubmitting(true);
    setResults([]);

    const newResults: SubmissionResult[] = [];

    for (const url of urls) {
      try {
        const response = await fetch('/api/indexnow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });

        const data = await response.json() as { success: boolean; error?: string };

        newResults.push({
          url,
          status: data.success ? 'success' : 'error',
          message: data.success ? 'Successfully submitted' : (data.error || 'Failed to submit'),
        });
      } catch (error) {
        newResults.push({
          url,
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
        });
      }

      setResults([...newResults]);
    }

    setIsSubmitting(false);
  };

  const getStatusIcon = (status: SubmissionResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'pending':
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
    }
  };

  const getStatusBadge = (status: SubmissionResult['status']) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-600">Success</Badge>;
      case 'error':
        return <Badge className="bg-red-600">Error</Badge>;
      case 'pending':
        return <Badge className="bg-blue-600">Pending</Badge>;
    }
  };

  return (
    <div className="container py-8 space-y-8 max-w-4xl">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">IndexNow Submission</h1>
        <p className="text-xl text-muted-foreground">
          Submit URLs to search engines instantly using IndexNow protocol
        </p>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Globe className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-medium text-blue-900 dark:text-blue-100">
                About IndexNow
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                IndexNow is an easy way to notify search engines whenever your website content is created, updated, or deleted. 
                Submit URLs to Bing, Yandex, and other participating search engines instantly.
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                <strong>API Key:</strong> b786ce2423fa4a1182fa2c99ae947657
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submission Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Submission Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedType('all')}
              className={`p-6 rounded-lg border-2 transition-all ${
                selectedType === 'all'
                  ? 'border-primary bg-primary/5'
                  : 'border-muted hover:border-primary/50'
              }`}
            >
              <div className="space-y-2">
                <Upload className="h-8 w-8 mx-auto" />
                <h3 className="font-semibold text-center">Submit All Pages</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Automatically submit all agent pages and static pages from the sitemap
                </p>
              </div>
            </button>

            <button
              onClick={() => setSelectedType('custom')}
              className={`p-6 rounded-lg border-2 transition-all ${
                selectedType === 'custom'
                  ? 'border-primary bg-primary/5'
                  : 'border-muted hover:border-primary/50'
              }`}
            >
              <div className="space-y-2">
                <Send className="h-8 w-8 mx-auto" />
                <h3 className="font-semibold text-center">Submit Custom URLs</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Enter specific URLs you want to submit to search engines
                </p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Submit All Section */}
      {selectedType === 'all' && (
        <Card>
          <CardHeader>
            <CardTitle>Submit All Pages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This will submit all URLs from your sitemap to search engines via IndexNow. 
              This includes all agent pages, category pages, and static pages.
            </p>
            <Button
              onClick={handleSubmitAll}
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-5 w-5" />
                  Submit All URLs to IndexNow
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Custom URLs Section */}
      {selectedType === 'custom' && (
        <Card>
          <CardHeader>
            <CardTitle>Submit Custom URLs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Enter URLs (one per line)
              </label>
              <textarea
                value={customUrls}
                onChange={(e) => setCustomUrls(e.target.value)}
                placeholder="https://ai-agents.30tools.com/agents/chatgpt&#10;https://ai-agents.30tools.com/agents/claude&#10;https://ai-agents.30tools.com/categories/coding"
                className="w-full min-h-[200px] p-3 rounded-lg border bg-background resize-y font-mono text-sm"
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground">
                Enter one URL per line. Make sure URLs are complete including https://
              </p>
            </div>
            <Button
              onClick={handleSubmitCustom}
              disabled={isSubmitting || !customUrls.trim()}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Submit Custom URLs
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Submission Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-muted/50"
                >
                  <div className="mt-0.5">{getStatusIcon(result.status)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm truncate">{result.url}</p>
                    {result.message && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {result.message}
                      </p>
                    )}
                  </div>
                  {getStatusBadge(result.status)}
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium">
                Summary: {results.filter((r) => r.status === 'success').length} successful,{' '}
                {results.filter((r) => r.status === 'error').length} failed
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips Card */}
      <Card>
        <CardHeader>
          <CardTitle>Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <h3 className="font-medium text-sm">When to use IndexNow:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>When you add new agent pages to your directory</li>
              <li>When you update existing agent information</li>
              <li>When you delete or remove agent pages</li>
              <li>After making significant content changes</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Important notes:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Don't submit the same URL too frequently (wait at least 24 hours)</li>
              <li>IndexNow supports Bing, Yandex, and other participating search engines</li>
              <li>Submission doesn't guarantee immediate indexing or ranking</li>
              <li>Monitor your Bing Webmaster Tools for indexing status</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}