"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Copy, Save, Trash2 } from "lucide-react";

export default function CreateAgentPage() {
  const [agentConfig, setAgentConfig] = useState({
    welcomeMessage: "Hello! How can I assist you today as a Customer Support?",
    provider: "openai",
    model: "gpt-4o-mini",
    maxTokens: 500,
    voice: "luna",
    audioRecording: true,
    videoRecording: false,
    backgroundDenoising: false,
    backgroundSound: "off",
    voicemailMessage: "Hey! Please call back when you're available.",
    temperature: 0.4,
    smartEndpointing: false,
    waitSeconds: 0.4,
    punctuationSeconds: 0.1,
    noPunctuationSeconds: 1.5,
    numberSeconds: 2.5,
    silenceTimeout: 15,
    maxDuration: 420,
    endCallMessage: "Thank you for contacting. Have a great day!",
    endCallPhrases: ["goodbye"],
    endCallFunctionEnabled: false
  });

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">test</h1>
            <Button variant="outline" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="text-red-500">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <Tabs defaultValue="agent-details" className="space-y-6">
          <TabsList>
            <TabsTrigger value="agent-details">Agent Details</TabsTrigger>
            <TabsTrigger value="transcriber">Transcriber</TabsTrigger>
            <TabsTrigger value="voice">Voice</TabsTrigger>
            <TabsTrigger value="call">Call</TabsTrigger>
            <TabsTrigger value="task">Task</TabsTrigger>
            <TabsTrigger value="functions">Functions</TabsTrigger>
          </TabsList>

          <TabsContent value="agent-details">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Agent Welcome Message</Label>
                  <Input
                    value={agentConfig.welcomeMessage}
                    onChange={(e) => setAgentConfig({...agentConfig, welcomeMessage: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Agent Prompt</Label>
                  <Textarea
                    className="min-h-[300px]"
                    placeholder="Enter the agent's prompt..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Provider</Label>
                    <Select value={agentConfig.provider}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Select value={agentConfig.model}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4o-mini">GPT-4O Mini</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Max Token</Label>
                  <Input
                    type="number"
                    value={agentConfig.maxTokens}
                    onChange={(e) => setAgentConfig({...agentConfig, maxTokens: parseInt(e.target.value)})}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Knowledge Base</Label>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">No files selected</p>
                    <Button variant="outline" size="sm">Add</Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="voice">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={false}
                      onCheckedChange={() => {}}
                    />
                    <Label>Add Voice ID Manually</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Voice</Label>
                  <Select value={agentConfig.voice}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="luna">Luna</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Audio Recording</Label>
                      <Switch
                        checked={agentConfig.audioRecording}
                        onCheckedChange={(checked) => setAgentConfig({...agentConfig, audioRecording: checked})}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Record the conversation with the assistant.</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Background Denoising</Label>
                      <Switch
                        checked={agentConfig.backgroundDenoising}
                        onCheckedChange={(checked) => setAgentConfig({...agentConfig, backgroundDenoising: checked})}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Filter background noise while the user is talking.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Background Sound</Label>
                  <Select value={agentConfig.backgroundSound}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="off">Off</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Video Recording</Label>
                    <Switch
                      checked={agentConfig.videoRecording}
                      onCheckedChange={(checked) => setAgentConfig({...agentConfig, videoRecording: checked})}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">This will record the video of your user.</p>
                </div>

                <div className="space-y-2">
                  <Label>Temperature</Label>
                  <Slider
                    value={[agentConfig.temperature]}
                    max={1}
                    step={0.1}
                    onValueChange={([value]) => setAgentConfig({...agentConfig, temperature: value})}
                  />
                  <p className="text-sm text-muted-foreground">
                    Increasing temperature enables heightened creativity, but increases chance of deviation from prompt
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="call">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Silence Timeout</Label>
                  <Slider
                    value={[agentConfig.silenceTimeout]}
                    max={30}
                    step={1}
                    onValueChange={([value]) => setAgentConfig({...agentConfig, silenceTimeout: value})}
                  />
                  <p className="text-sm text-muted-foreground">
                    How long to wait before a call is automatically ended due to inactivity.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Maximum Duration</Label>
                  <Slider
                    value={[agentConfig.maxDuration]}
                    max={900}
                    step={30}
                    onValueChange={([value]) => setAgentConfig({...agentConfig, maxDuration: value})}
                  />
                  <p className="text-sm text-muted-foreground">
                    The maximum number of seconds a call will last.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>End Call Message</Label>
                  <Input
                    value={agentConfig.endCallMessage}
                    onChange={(e) => setAgentConfig({...agentConfig, endCallMessage: e.target.value})}
                    placeholder="Message to be played before ending the call"
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Call Phrases</Label>
                  <div className="flex gap-2 flex-wrap">
                    {agentConfig.endCallPhrases.map((phrase, index) => (
                      <div key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {phrase}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>End Call Function</Label>
                    <Switch
                      checked={agentConfig.endCallFunctionEnabled}
                      onCheckedChange={(checked) => setAgentConfig({...agentConfig, endCallFunctionEnabled: checked})}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable the end call functionality.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}