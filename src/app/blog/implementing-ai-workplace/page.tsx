import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag, CheckCircle, AlertTriangle, Users, Settings, TrendingUp, Shield } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';

export const metadata: Metadata = {
  title: "How to Successfully Implement AI Agents in Your Workplace | Complete Guide",
  description: "Step-by-step guide to introducing AI agents in your organization. Learn best practices, avoid common pitfalls, and ensure successful adoption with our proven framework.",
  keywords: "AI implementation, workplace AI adoption, AI agents deployment, change management, AI strategy, digital transformation, AI integration, organizational change, AI best practices, technology adoption",
  openGraph: {
    title: "How to Successfully Implement AI Agents in Your Workplace",
    description: "Complete guide to AI agent implementation with proven strategies and best practices.",
    type: "article",
  },
};

export default function ImplementingAIWorkplace() {
  const implementationPhases = [
    {
      phase: "Assessment & Planning",
      duration: "2-4 weeks",
      icon: Settings,
      description: "Evaluate current processes and define AI strategy",
      steps: [
        "Conduct workflow audit",
        "Identify automation opportunities",
        "Define success metrics",
        "Create implementation roadmap",
        "Secure stakeholder buy-in"
      ],
      deliverables: ["AI readiness assessment", "Implementation plan", "Budget approval"]
    },
    {
      phase: "Pilot Program",
      duration: "4-8 weeks",
      icon: Users,
      description: "Test AI agents with a small group before full rollout",
      steps: [
        "Select pilot team and use cases",
        "Deploy AI agents in controlled environment",
        "Provide training and support",
        "Monitor performance and gather feedback",
        "Refine processes based on learnings"
      ],
      deliverables: ["Pilot results report", "Refined implementation plan", "Training materials"]
    },
    {
      phase: "Gradual Rollout",
      duration: "8-16 weeks",
      icon: TrendingUp,
      description: "Expand AI implementation across departments",
      steps: [
        "Roll out to additional teams",
        "Scale training programs",
        "Establish support processes",
        "Monitor adoption rates",
        "Address resistance and challenges"
      ],
      deliverables: ["Adoption metrics", "Support documentation", "Change management plan"]
    },
    {
      phase: "Optimization",
      duration: "Ongoing",
      icon: Shield,
      description: "Continuously improve and expand AI capabilities",
      steps: [
        "Analyze performance data",
        "Optimize AI configurations",
        "Expand to new use cases",
        "Update training programs",
        "Plan next phase improvements"
      ],
      deliverables: ["Performance reports", "Optimization recommendations", "Future roadmap"]
    }
  ];

  const commonChallenges = [
    {
      challenge: "Employee Resistance",
      impact: "High",
      description: "Fear of job displacement and change resistance",
      solutions: [
        "Transparent communication about AI's role",
        "Emphasize AI as augmentation, not replacement",
        "Involve employees in selection process",
        "Showcase early wins and benefits"
      ]
    },
    {
      challenge: "Technical Integration",
      impact: "Medium",
      description: "Difficulty integrating with existing systems",
      solutions: [
        "Thorough technical assessment",
        "Choose AI tools with good API support",
        "Plan for data migration and cleanup",
        "Work with IT team from day one"
      ]
    },
    {
      challenge: "Data Quality Issues",
      impact: "High",
      description: "Poor data quality affecting AI performance",
      solutions: [
        "Audit existing data sources",
        "Implement data cleaning processes",
        "Establish data governance policies",
        "Start with high-quality data subsets"
      ]
    },
    {
      challenge: "ROI Measurement",
      impact: "Medium",
      description: "Difficulty proving value and return on investment",
      solutions: [
        "Define clear KPIs before implementation",
        "Implement tracking and analytics",
        "Regular performance reviews",
        "Document time and cost savings"
      ]
    }
  ];

  return (
    <article className="container py-8 max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="mb-6">
        <Link href="/blog">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-6 mb-12">
        <div className="space-y-4">
          <Badge variant="secondary">Implementation Guide</Badge>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            How to Successfully Implement AI Agents in Your Workplace
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Step-by-step guide to introducing AI agents in your organization, including best practices, 
            common pitfalls to avoid, and proven strategies for successful adoption and change management.
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            January 5, 2024
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            9 min read
          </div>
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-2" />
            Implementation, Workplace AI, Strategy
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4">The Strategic Importance of AI Implementation</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Successfully implementing AI agents in the workplace is not just about choosing the right 
            technology—it's about orchestrating organizational change. Companies that approach AI 
            implementation strategically see 3x higher success rates and 40% faster ROI realization 
            compared to those that rush into deployment without proper planning.
          </p>
          
          <div className="bg-muted/50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-3">Why Most AI Implementations Fail</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• <strong>60%</strong> - Inadequate change management</li>
                <li>• <strong>45%</strong> - Poor data quality</li>
                <li>• <strong>40%</strong> - Lack of clear strategy</li>
              </ul>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• <strong>35%</strong> - Insufficient training</li>
                <li>• <strong>30%</strong> - Technical integration issues</li>
                <li>• <strong>25%</strong> - Unrealistic expectations</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">4-Phase Implementation Framework</h2>
          
          <div className="space-y-8">
            {implementationPhases.map((phase, index) => (
              <Card key={index} className="p-6 border-l-4 border-l-primary">
                <div className="flex items-start space-x-6">
                  <div className="bg-primary text-primary-foreground rounded-full p-3">
                    <phase.icon className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold">Phase {index + 1}: {phase.phase}</h3>
                      <Badge variant="outline">{phase.duration}</Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{phase.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Key Steps
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {phase.steps.map((step, i) => (
                            <li key={i}>• {step}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                          Deliverables
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {phase.deliverables.map((deliverable, i) => (
                            <li key={i}>• {deliverable}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">Common Challenges and Solutions</h2>
          
          <div className="space-y-6">
            {commonChallenges.map((item, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <h3 className="text-xl font-bold">{item.challenge}</h3>
                  </div>
                  <Badge 
                    variant={item.impact === 'High' ? 'secondary' : 'outline'}
                    className={item.impact === 'High' ? 'bg-red-100 text-red-800 border-red-200' : ''}
                  >
                    {item.impact} Impact
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-4">{item.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Solutions
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {item.solutions.map((solution, i) => (
                      <li key={i}>• {solution}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Success Metrics and KPIs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="p-6 text-center border-blue-200 bg-blue-50">
              <h4 className="font-semibold mb-2 text-blue-800">Efficiency Metrics</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>Time saved per task</li>
                <li>Process completion speed</li>
                <li>Error reduction rate</li>
              </ul>
            </Card>
            
            <Card className="p-6 text-center border-green-200 bg-green-50">
              <h4 className="font-semibold mb-2 text-green-800">Business Metrics</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>Cost per transaction</li>
                <li>Revenue impact</li>
                <li>Customer satisfaction</li>
              </ul>
            </Card>
            
            <Card className="p-6 text-center border-purple-200 bg-purple-50">
              <h4 className="font-semibold mb-2 text-purple-800">Adoption Metrics</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>User adoption rate</li>
                <li>Feature utilization</li>
                <li>Training completion</li>
              </ul>
            </Card>
          </div>
          
          <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-primary">Measuring ROI</h3>
            <p className="text-muted-foreground mb-3">
              Calculate your AI implementation ROI using this formula:
            </p>
            <div className="bg-white p-4 rounded border text-center">
              <code className="text-lg font-mono">
                ROI = (Benefits - Costs) / Costs × 100
              </code>
            </div>
            <p className="text-muted-foreground text-sm mt-3">
              Include all costs: software licenses, training, implementation time, and ongoing maintenance. 
              Benefits include time savings, error reduction, and improved customer satisfaction.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Change Management Best Practices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-green-200 bg-green-50">
              <h3 className="text-lg font-semibold mb-3 text-green-800 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Do's
              </h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Communicate the 'why' behind AI adoption</li>
                <li>• Involve employees in the selection process</li>
                <li>• Provide comprehensive training programs</li>
                <li>• Celebrate early wins and success stories</li>
                <li>• Create AI champions within each team</li>
                <li>• Maintain open feedback channels</li>
              </ul>
            </Card>
            
            <Card className="p-6 border-red-200 bg-red-50">
              <h3 className="text-lg font-semibold mb-3 text-red-800 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Don'ts
              </h3>
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Don't implement AI without employee input</li>
                <li>• Don't overpromise on initial capabilities</li>
                <li>• Don't ignore security and privacy concerns</li>
                <li>• Don't rush the rollout process</li>
                <li>• Don't neglect ongoing support and training</li>
                <li>• Don't forget to measure and communicate results</li>
              </ul>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Case Study: Mid-Size Marketing Agency</h2>
          
          <div className="bg-muted/50 p-6 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">150</div>
                <div className="text-xs text-muted-foreground">Employees</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">6 Months</div>
                <div className="text-xs text-muted-foreground">Implementation Timeline</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">240%</div>
                <div className="text-xs text-muted-foreground">ROI in Year 1</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">95%</div>
                <div className="text-xs text-muted-foreground">Employee Adoption Rate</div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-3">Implementation Highlights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Phase 1 (Months 1-2)</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Content creation AI for blog writing</li>
                    <li>• Automated social media scheduling</li>
                    <li>• 10-person pilot team</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Phase 2 (Months 3-6)</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Client reporting automation</li>
                    <li>• AI-powered design tools</li>
                    <li>• Company-wide rollout</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-2">Key Success Factors</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Executive sponsorship from day one</li>
                <li>• Dedicated AI implementation team</li>
                <li>• Regular training sessions and workshops</li>
                <li>• Clear communication about job security</li>
                <li>• Gradual rollout with constant feedback</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Next Steps: Your Implementation Checklist</h2>
          
          <Card className="p-6 bg-primary text-primary-foreground">
            <h3 className="text-xl font-bold mb-4">Week 1-2: Foundation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Assessment</h4>
                <ul className="text-sm space-y-1 opacity-90">
                  <li>□ Conduct workflow audit</li>
                  <li>□ Identify automation opportunities</li>
                  <li>□ Assess current technology stack</li>
                  <li>□ Survey employee readiness</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Planning</h4>
                <ul className="text-sm space-y-1 opacity-90">
                  <li>□ Define success metrics</li>
                  <li>□ Create implementation timeline</li>
                  <li>□ Secure budget approval</li>
                  <li>□ Form implementation team</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Long-term Success Strategies</h2>
          
          <p className="text-muted-foreground leading-relaxed mb-6">
            Successful AI implementation is not a one-time project but an ongoing journey. Organizations 
            that treat AI as a continuous improvement initiative see sustained benefits and competitive 
            advantages. Plan for evolution, stay updated with new capabilities, and maintain a culture 
            of innovation and learning.
          </p>
          
          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Building an AI-Ready Culture</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Encourage experimentation and learning from failures</li>
              <li>• Invest in continuous training and skill development</li>
              <li>• Create cross-functional AI innovation teams</li>
              <li>• Establish regular review and optimization cycles</li>
              <li>• Stay informed about emerging AI technologies and trends</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Related Articles */}
      <section className="mt-12 pt-8 border-t">
        <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/blog/best-ai-agents-2025">
            <Card className="hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-lg">10 Best AI Agents for Business Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Discover the top AI agents to consider for your implementation.
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/blog/ai-productivity-guide">
            <Card className="hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-lg">Complete Guide to AI-Powered Productivity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Learn how to maximize productivity with AI integration.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </article>
  );
}